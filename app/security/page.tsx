"use client";

import { useEffect, useMemo, useState } from "react";
import { AppNav } from "../../components/AppNav";

const protections = [
  {
    title: "Walidacja inputu",
    status: "Aktywne",
    description:
      "Agent sprawdza długość, puste wiadomości i próby wymuszenia ujawnienia instrukcji systemowych przed wysłaniem zapytania do modelu.",
  },
  {
    title: "Filtr outputu",
    status: "Aktywne",
    description:
      "Odpowiedź jest oczyszczana z treści, które mogłyby ujawnić system prompt, wewnętrzne reguły lub ukryte instrukcje agenta.",
  },
  {
    title: "Limit wiadomości",
    status: "50 / godzinę",
    description:
      "Każdy zalogowany użytkownik ma limit wiadomości godzinowych, żeby chronić aplikację przed nadużyciami i przypadkowym przeciążeniem.",
  },
  {
    title: "Budżet tokenów",
    status: "10 000 / dzień",
    description:
      "Wywołania AI są zapisywane w tabeli api_usage. Po przekroczeniu dziennego limitu użytkownik zobaczy komunikat: Wróć jutro.",
  },
];

type SecurityStats = {
  acceptedMessages: number;
  blockedInputs: number;
  filteredOutputs: number;
  rateLimited: number;
  tokenLimited: number;
  abuseAttempts: number;
  recentEvents: Array<{
    type: string;
    createdAt: string;
  }>;
};

const defaultStats: SecurityStats = {
  acceptedMessages: 0,
  blockedInputs: 0,
  filteredOutputs: 0,
  rateLimited: 0,
  tokenLimited: 0,
  abuseAttempts: 0,
  recentEvents: [],
};

const eventLabels: Record<string, string> = {
  accepted_message: "Poprawna wiadomość",
  blocked_input: "Zablokowany input",
  filtered_output: "Odfiltrowana odpowiedź",
  rate_limited: "Limit wiadomości",
  token_limited: "Limit tokenów",
};

export default function SecurityPage() {
  const [stats, setStats] = useState<SecurityStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  const monitoringCards = useMemo(
    () => [
      {
        title: "Próby nadużyć",
        value: stats.abuseAttempts,
        description: "Suma zablokowanych inputów, filtrów outputu oraz trafień limitów.",
      },
      {
        title: "Zablokowane inputy",
        value: stats.blockedInputs,
        description: "Wiadomości zatrzymane przed wysłaniem do modelu.",
      },
      {
        title: "Odfiltrowane odpowiedzi",
        value: stats.filteredOutputs,
        description: "Odpowiedzi zatrzymane, bo mogły ujawniać dane techniczne.",
      },
      {
        title: "Trafienia limitów",
        value: stats.rateLimited + stats.tokenLimited,
        description: "Przekroczenia limitu wiadomości lub dziennego budżetu tokenów.",
      },
    ],
    [stats],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const response = await fetch("/api/security/stats", { cache: "no-store" });
        const data = (await response.json().catch(() => null)) as
          | { ok?: boolean; stats?: SecurityStats }
          | null;

        if (isMounted && response.ok && data?.ok && data.stats) {
          setStats(data.stats);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStats();
    const interval = window.setInterval(loadStats, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <main className="chat-shell">
      <section className="chat-card wide">
        <AppNav active="/security" />

        <header className="hero-card">
          <div>
            <p className="eyebrow">LEKCJA 10 - OBRONA AGENTA</p>
            <h1>Bezpieczeństwo</h1>
            <p>
              Panel pokazuje zabezpieczenia wdrożone w agencie: walidację wejścia,
              filtrowanie odpowiedzi, limit wiadomości oraz dzienny budżet tokenów.
            </p>
          </div>
          <span className="mode-pill">ochrona aktywna</span>
        </header>

        <section className="security-grid" aria-label="Zabezpieczenia agenta">
          {protections.map((item) => (
            <article className="security-card" key={item.title}>
              <div>
                <h2>{item.title}</h2>
                <span>{item.status}</span>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="security-card security-wide">
          <div>
            <h2>Monitoring prób nadużyć</h2>
            <span>{isLoading ? "ładowanie" : "na żywo"}</span>
          </div>
          <p>
            Panel pokazuje, ile razy zabezpieczenia realnie zadziałały podczas rozmów z agentem.
          </p>
        </section>

        <section className="security-grid" aria-label="Monitoring bezpieczeństwa">
          {monitoringCards.map((item) => (
            <article className="security-card" key={item.title}>
              <div>
                <h2>{item.title}</h2>
                <span>{item.value}</span>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="security-card security-wide">
          <div>
            <h2>Ostatnie zdarzenia</h2>
            <span>{stats.recentEvents.length}</span>
          </div>
          {stats.recentEvents.length > 0 ? (
            <ul>
              {stats.recentEvents.map((event) => (
                <li key={`${event.type}-${event.createdAt}`}>
                  {eventLabels[event.type] ?? event.type} —{" "}
                  {new Intl.DateTimeFormat("pl-PL", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(new Date(event.createdAt))}
                </li>
              ))}
            </ul>
          ) : (
            <p>Brak zarejestrowanych prób nadużyć w tej sesji serwera.</p>
          )}
        </section>
      </section>
    </main>
  );
}
