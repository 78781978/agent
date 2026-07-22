type SearchSource = {
  title: string;
  url: string;
  snippet: string;
};

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value: string) {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "));
}

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function normalizeDuckUrl(rawUrl: string) {
  let url = decodeHtml(rawUrl);

  if (url.includes("/l/?")) {
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://duckduckgo.com${url}`);
      url = parsed.searchParams.get("uddg") ?? url;
    } catch {
      return url;
    }
  }

  return url;
}

function uniqueSources(sources: SearchSource[]) {
  const seen = new Set<string>();

  return sources.filter((source) => {
    if (!source.url.startsWith("http") || seen.has(source.url)) {
      return false;
    }

    seen.add(source.url);
    return true;
  });
}

function extractHtmlResults(html: string): SearchSource[] {
  const results: SearchSource[] = [];
  const blocks = html.split(/<div class="result results_links|<div class="web-result/g);

  for (const block of blocks) {
    const link = block.match(/<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);

    if (!link) {
      continue;
    }

    const snippet =
      block.match(/<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/)?.[1] ??
      block.match(/<div[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/div>/)?.[1] ??
      "";

    results.push({
      title: stripTags(link[2]),
      url: normalizeDuckUrl(link[1]),
      snippet: stripTags(snippet),
    });
  }

  return uniqueSources(results).slice(0, 6);
}

function extractLiteResults(html: string): SearchSource[] {
  const results: SearchSource[] = [];
  const linkRegex = /<a[^>]+rel="nofollow"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = normalizeDuckUrl(match[1]);
    const title = stripTags(match[2]);

    if (!title || title.length < 3) {
      continue;
    }

    const afterLink = html.slice(match.index + match[0].length, match.index + match[0].length + 700);
    const snippet =
      stripTags(afterLink.match(/<td[^>]*class=['"]result-snippet['"][^>]*>([\s\S]*?)<\/td>/)?.[1] ?? "")
        || stripTags(afterLink).slice(0, 220);

    results.push({
      title,
      url,
      snippet,
    });

    if (results.length >= 6) {
      break;
    }
  }

  return uniqueSources(results).slice(0, 6);
}

function polishFirst(sources: SearchSource[]) {
  const polish = sources.filter((source) => {
    const text = `${source.title} ${source.snippet} ${source.url}`.toLowerCase();

    return (
      domainFromUrl(source.url).endsWith(".pl") ||
      /[ąćęłńóśźż]/i.test(text) ||
      text.includes("polska") ||
      text.includes("polsce")
    );
  });

  return polish.length > 0 ? polish : sources;
}

async function fetchSearchResults(query: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const enriched = `${query} Polska aktualne`;
  const urls = [
    `https://duckduckgo.com/html/?q=${encodeURIComponent(enriched)}&kl=pl-pl`,
    `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(enriched)}&kl=pl-pl`,
    `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}&kl=wt-wt`,
  ];

  try {
    for (const url of urls) {
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
        continue;
      }

      const html = await response.text();
      const sources = [...extractHtmlResults(html), ...extractLiteResults(html)];
      const unique = polishFirst(uniqueSources(sources));

      if (unique.length > 0) {
        return unique;
      }
    }

    return [];
  } finally {
    clearTimeout(timeout);
  }
}

async function readPage(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

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
      throw new Error(`HTTP ${response.status}`);
    }

    return stripTags(await response.text()).slice(0, 5000);
  } finally {
    clearTimeout(timeout);
  }
}

function extractUrl(text: string) {
  return text.match(/https?:\/\/[^\s)]+/i)?.[0] ?? "";
}

function googleFallback(query: string): SearchSource {
  return {
    title: `Otwórz wyniki Google dla: ${query}`,
    url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    snippet:
      "Automatyczne pobranie wyników nie powiodło się. Ten link pozwala ręcznie sprawdzić aktualne wyniki.",
  };
}

function buildAnswer(query: string, sources: SearchSource[], automatic = true) {
  const usedSources = sources.length > 0 ? sources : [googleFallback(query)];
  const domains = usedSources
    .slice(0, 4)
    .map((source) => domainFromUrl(source.url))
    .join(", ");

  return [
    `## Wynik wyszukiwania: ${query}`,
    "",
    automatic
      ? `Sprawdziłam dostępne wyniki i najpierw szukałam polskiego kontekstu. Najbardziej przydatne domeny: **${domains}**.`
      : "Nie udało się automatycznie pobrać wyników z wyszukiwarki. Daję bezpieczny link do Google, żeby można było szybko sprawdzić temat ręcznie.",
    "",
    "### Najważniejsze informacje",
    ...usedSources.slice(0, 5).map((source) => `- ${source.snippet || source.title}`),
    "",
    "### Co dalej",
    "Jeśli wynik ma być bardziej precyzyjny, wpisz nazwę miasta, markę, produkt albo wklej konkretny adres strony. Wtedy agent może przeczytać stronę i streścić ją wprost w czacie.",
    "",
    "### Źródła",
    ...usedSources.slice(0, 5).map((source, index) => `${index + 1}. [${source.title}](${source.url})`),
  ].join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { query?: unknown } | null;
  const query = typeof body?.query === "string" ? body.query.trim() : "";

  if (!query) {
    return Response.json({ error: "Wpisz pytanie albo adres strony." }, { status: 400 });
  }

  const url = extractUrl(query);

  try {
    if (url) {
      const content = await readPage(url);

      return Response.json({
        text: [
          `## Streszczenie strony: ${domainFromUrl(url)}`,
          "",
          content
            ? `${content.slice(0, 1600)}${content.length > 1600 ? "..." : ""}`
            : "Strona została pobrana, ale nie udało się wyciągnąć czytelnej treści.",
          "",
          `Źródło: [${domainFromUrl(url)}](${url})`,
        ].join("\n"),
        sources: [{ title: domainFromUrl(url), url, snippet: "Odczytana strona WWW" }],
      });
    }

    const sources = await fetchSearchResults(query);

    return Response.json({
      text: buildAnswer(query, sources, sources.length > 0),
      sources: sources.length > 0 ? sources : [googleFallback(query)],
    });
  } catch (error) {
    const fallback = googleFallback(query);

    return Response.json({
      text: [
        buildAnswer(query, [], false),
        "",
        `Informacja techniczna: ${error instanceof Error ? error.message : "wyszukiwarka nie odpowiedziała"}.`,
      ].join("\n"),
      sources: [fallback],
    });
  }
}
