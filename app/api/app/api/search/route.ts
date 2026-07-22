type SearchSource = {
  title: string;
  url: string;
  snippet: string;
};

function cleanHtml(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function extractUrl(text: string) {
  return text.match(/https?:\/\/[^\s)]+/i)?.[0] ?? "";
}

function extractResults(html: string): SearchSource[] {
  const results: SearchSource[] = [];
  const regex =
    /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    let url = cleanHtml(match[1]);
    const title = cleanHtml(match[2]);
    const snippet = cleanHtml(match[3]);

    if (url.includes("/l/?")) {
      try {
        const parsed = new URL(url.startsWith("http") ? url : `https://duckduckgo.com${url}`);
        url = parsed.searchParams.get("uddg") ?? url;
      } catch {
        // zostawiam oryginalny adres
      }
    }

    if (!url.startsWith("http")) continue;

    results.push({ title, url, snippet });

    if (results.length >= 6) break;
  }

  return results;
}

async function searchWeb(query: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const searchQuery = `${query} Polska aktualne`;
    const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}&kl=pl-pl`;

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 VieSearch/1.0",
        accept: "text/html,application/xhtml+xml,text/plain",
        "accept-language": "pl-PL,pl;q=0.9,en;q=0.6",
      },
    });

    if (!response.ok) {
      throw new Error(`Wyszukiwarka zwrocila blad HTTP ${response.status}.`);
    }

    return extractResults(await response.text());
  } finally {
    clearTimeout(timeout);
  }
}

async function readPage(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 VieSearch/1.0",
        accept: "text/html,application/xhtml+xml,text/plain",
        "accept-language": "pl-PL,pl;q=0.9,en;q=0.6",
      },
    });

    if (!response.ok) {
      throw new Error(`Strona zwrocila blad HTTP ${response.status}.`);
    }

    const html = await response.text();
    return cleanHtml(html).slice(0, 4500);
  } finally {
    clearTimeout(timeout);
  }
}

function buildAnswer(query: string, sources: SearchSource[]) {
  if (sources.length === 0) {
    return [
      `Nie udalo mi sie pobrac aktualnych wynikow dla zapytania: **${query}**.`,
      "",
      "Nie bede wymyslac odpowiedzi. Sprobuj wpisac bardziej konkretna fraze albo podaj link do strony.",
    ].join("\n");
  }

  const domains = sources
    .slice(0, 4)
    .map((source) => domainFromUrl(source.url))
    .join(", ");

  return [
    `## Krotkie opracowanie: ${query}`,
    "",
    `Sprawdzilam aktualne wyniki wyszukiwania. Najpierw szukalam polskiego kontekstu. Najbardziej przydatne zrodla pochodza z domen: **${domains}**.`,
    "",
    "### Najwazniejsze informacje",
    ...sources.slice(0, 5).map((source) => `- ${source.snippet || source.title}`),
    "",
    "### Wniosek",
    "To sa informacje z aktualnie znalezionych zrodel. Przy cenach, repertuarach, produktach i wydarzeniach warto kliknac zrodlo i potwierdzic szczegoly, bo takie dane szybko sie zmieniaja.",
    "",
    "### Zrodla",
    ...sources.slice(0, 5).map((source, index) => `${index + 1}. [${source.title}](${source.url})`),
  ].join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { query?: unknown } | null;
  const query = typeof body?.query === "string" ? body.query.trim() : "";

  if (!query) {
    return Response.json({ error: "Wpisz pytanie albo adres strony." }, { status: 400 });
  }

  try {
    const url = extractUrl(query);

    if (url) {
      const content = await readPage(url);

      return Response.json({
        text: [
          `## Streszczenie strony: ${domainFromUrl(url)}`,
          "",
          content
            ? `${content.slice(0, 1400)}${content.length > 1400 ? "..." : ""}`
            : "Strona zostala pobrana, ale nie udalo sie wyciagnac czytelnej tresci.",
          "",
          `Zrodlo: [${domainFromUrl(url)}](${url})`,
        ].join("\n"),
        sources: [{ title: domainFromUrl(url), url }],
      });
    }

    const sources = await searchWeb(query);

    return Response.json({
      text: buildAnswer(query, sources),
      sources,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? `Nie udalo sie pobrac wynikow: ${error.message}`
            : "Nie udalo sie pobrac wynikow.",
      },
      { status: 500 },
    );
  }
}
