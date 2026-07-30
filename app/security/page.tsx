"use client";

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

const technicalFiles = [
  "lib/security.ts",
  "lib/api-usage.ts",
  "app/api/chat/route.ts",
  "app/api/agent/route.ts",
  "supabase/migrations/20260730_api_usage_budget.sql",
];

export default function SecurityPage() {
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
            <h2>Pliki techniczne</h2>
            <span>do kontroli</span>
          </div>
          <ul>
            {technicalFiles.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
