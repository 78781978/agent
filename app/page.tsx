"use client";

import { AppNav } from "../../components/AppNav";
import { Fragment, useMemo, useState } from "react";

const sampleEmails = `Mail 1 - PILNY:
Od: jan.kowalski@firma.pl
Temat: PILNE - Problem z fakturą
Treść: Dzień dobry, mam problem z fakturą FV/2026/001. Kwota jest nieprawidłowa - powinno być 5000 zł a jest 3000 zł. Proszę o PILNĄ korektę. Termin płatności mija jutro.

Mail 2 - SPAM:
Od: winner@lucky-prize.com
Temat: Congratulations! You won $1,000,000
Treść: Click here to claim your prize! Limited time offer. Act now!

Mail 3 - OFERTA:
Od: anna.nowak@partner.pl
Temat: Propozycja współpracy
Treść: Dzień dobry, reprezentuję firmę ABC Solutions. Chcielibyśmy omówić możliwość współpracy w zakresie dostarczania usług IT. Czy możemy umówić się na spotkanie w przyszłym tygodniu?

Mail 4 - REKLAMACJA:
Od: klient123@gmail.com
Temat: Nie działa usługa od 3 dni
Treść: Witam, od poniedziałku nie mogę się zalogować do panelu klienta. Próbowałem resetować hasło ale nie dostaje maila. To już trzeci dzień! Jeśli nie rozwiążecie tego dziś, zrezygnuję z usługi.

Mail 5 - INFO:
Od: newsletter@branżowy-portal.pl
Temat: Nowe trendy AI w biznesie - raport 2026
Treść: Zapraszamy do lektury naszego najnowszego raportu o zastosowaniach AI w polskich firmach. Pobierz za darmo na naszej stronie.`;

type ParsedMail = {
  title: string;
  category: string;
  priority: string;
  reason: string;
  draft: string;
};

function splitEmails(value: string) {
  return value
    .split(/\n\s*\n(?=Mail\s+\d+|Od:|Temat:)/i)
    .map((email) => email.trim())
    .filter(Boolean);
}

function getPriorityClass(priority: string) {
  if (/wysoki|piln|🔴/i.test(priority)) {
    return "urgent";
  }

  if (/średni|sredni|🟡/i.test(priority)) {
    return "medium";
  }

  if (/spam|🗑/i.test(priority)) {
    return "spam";
  }

  return "low";
}

function extractTableValue(block: string, label: string) {
  const regex = new RegExp(`\\|\\s*${label}\\s*\\|\\s*([^|]+)\\|`, "i");
  return block.match(regex)?.[1]?.trim() ?? "";
}

function parseTriageResult(text: string): ParsedMail[] {
  const blocks = text.split(/(?=###\s*Mail\s+\d+:)/i).filter((block) => /^###\s*Mail\s+\d+:/i.test(block.trim()));

  return blocks.map((block) => {
    const title = block.match(/^###\s*(Mail\s+\d+:\s*.+)$/im)?.[1]?.trim() ?? "Mail";
    const draft =
      block.match(/\*\*Proponowana odpowiedź:\*\*\s*\n?>\s*([\s\S]*?)(?:\n---|\n## PODSUMOWANIE|$)/i)?.[1]
        ?.replace(/^>\s?/gm, "")
        .trim() ?? "";

    return {
      title,
      category: extractTableValue(block, "Kategoria"),
      priority: extractTableValue(block, "Priorytet"),
      reason: extractTableValue(block, "Uzasadnienie"),
      draft,
    };
  });
}

function parseSummary(text: string) {
  const summary = text.match(/##\s*PODSUMOWANIE[\s\S]*$/i)?.[0] ?? "";

  return {
    urgent: summary.match(/Pilne:\s*(\d+)/i)?.[1] ?? "0",
    medium: summary.match(/Średnie:\s*(\d+)/i)?.[1] ?? summary.match(/Srednie:\s*(\d+)/i)?.[1] ?? "0",
    low: summary.match(/Niskie:\s*(\d+)/i)?.[1] ?? "0",
    spam: summary.match(/Spam:\s*(\d+)/i)?.[1] ?? "0",
    recommendation: summary.match(/Rekomendacja:\s*([\s\S]+)/i)?.[1]?.trim() ?? "",
  };
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

function renderRawMarkdown(text: string) {
  return text.split("\n").map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {renderInline(line)}
      {index < text.split("\n").length - 1 ? <br /> : null}
    </Fragment>
  ));
}

export default function EmailTriagePage() {
  const [input, setInput] = useState(sampleEmails);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const parsedMails = useMemo(() => parseTriageResult(result), [result]);
  const summary = useMemo(() => parseSummary(result), [result]);

  async function handleAnalyze() {
    const emails = splitEmails(input);

    if (emails.length === 0 || isLoading) {
      return;
    }

    setResult("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/email-triage", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ emails }),
      });

      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Agent nie zwrócił analizy maili.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        setResult((current) => current + decoder.decode(value, { stream: true }));
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Nie udało się połączyć z agentem e-mail triage.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function copyDraft(draft: string) {
    await navigator.clipboard.writeText(draft);
  }

  return (
    <main className="chat-shell">
      <section className="chat-card wide" aria-label="E-mail Triage">
        <AppNav active="/email-triage" />

        <header className="chat-header">
          <div>
            <p className="eyebrow">Lekcja 8 · Warsztat 1</p>
            <h1>📧 E-mail Triage</h1>
            <p className="subtitle">
              Wklej maile - agent posortuje je, nada priorytety i napisze szkice odpowiedzi.
            </p>
          </div>
          <div className="model-pill expert">triage</div>
        </header>

        <section className="email-triage-grid">
          <div className="email-input-panel">
            <div className="email-panel-header">
              <strong>Maile do analizy</strong>
              <button type="button" onClick={() => setInput(sampleEmails)} disabled={isLoading}>
                📋 Wklej przykład
              </button>
            </div>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Wklej maile tutaj - oddziel je pustą linią..."
              rows={12}
            />
            <button className="primary-action" type="button" onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? "📧 Analizuję..." : "📧 Analizuj maile"}
            </button>
          </div>

          <div className="email-results-panel">
            {!result && !isLoading && (
              <div className="empty-state">
                <p>
                  Wynik pojawi się tutaj. Każdy mail dostanie kategorię, priorytet i gotowy draft odpowiedzi.
                </p>
              </div>
            )}

            {(result || isLoading) && (
              <>
                <div className="triage-summary">
                  <span className="urgent">🔴 {summary.urgent} pilne</span>
                  <span className="medium">🟡 {summary.medium} średnie</span>
                  <span className="low">🟢 {summary.low} niskie</span>
                  <span className="spam">🗑️ {summary.spam} spam</span>
                </div>

                {parsedMails.length > 0 ? (
                  <div className="triage-cards">
                    {parsedMails.map((mail) => (
                      <article className={`triage-card ${getPriorityClass(mail.priority)}`} key={mail.title}>
                        <div className="triage-card-header">
                          <h2>{mail.title}</h2>
                          <span>{mail.priority || "Priorytet"}</span>
                        </div>
                        <dl>
                          <div>
                            <dt>Kategoria</dt>
                            <dd>{mail.category || "Do ustalenia"}</dd>
                          </div>
                          <div>
                            <dt>Uzasadnienie</dt>
                            <dd>{mail.reason || "Brak uzasadnienia"}</dd>
                          </div>
                        </dl>
                        <blockquote>{mail.draft || "Draft pojawi się po zakończeniu analizy."}</blockquote>
                        {mail.draft && (
                          <button type="button" onClick={() => copyDraft(mail.draft)}>
                            Kopiuj draft
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="bubble markdown-content">{renderRawMarkdown(result || "Agent analizuje maile...")}</div>
                )}

                {summary.recommendation && (
                  <div className="triage-recommendation">
                    <strong>Rekomendacja</strong>
                    <p>{summary.recommendation}</p>
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="error-box">
                <p>{error}</p>
                <button type="button" onClick={() => setError(null)}>
                  Zamknij
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
