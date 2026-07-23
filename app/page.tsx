"use client";

import Link from "next/link";
import { AppNav } from "../components/AppNav";
import { useEffect, useMemo, useState } from "react";

type ToolResult<T> = {
  ok: boolean;
  data: T;
  updatedAt: string;
  source: string;
  error?: string;
};

type DashboardData = {
  ok: boolean;
  generatedAt: string;
  currentDate: {
    iso: string;
    label: string;
  };
  weather: ToolResult<{
    city: string;
    temperatureC: number | null;
    windKmh: number | null;
    humidityPercent: number | null;
    description: string;
  }>;
  rates: Array<
    ToolResult<{
      code: "EUR" | "USD" | "GBP";
      rate: number | null;
      date: string;
    }>
  >;
  holidays: ToolResult<
    Array<{
      name: string;
      localName: string;
      date: string;
      daysLeft: number;
    }>
  >;
};

const quickActions = [
  {
    href: "/agent",
    icon: "AI",
    label: "Agent pełna moc",
    description: "Autonomiczny agent z narzędziami, wyszukiwaniem, grafiką i bazą wiedzy.",
  },
  {
    href: "/wash",
    icon: "W",
    label: "Agent marketingowy myjni",
    description: "Panel dla właściciela: posty, kampanie, e-mail i decyzje sprzedażowe.",
  },
  {
    href: "/wash-booking",
    icon: "R",
    label: "Agent rezerwacji myjni",
    description: "Obsługa klienta: dobór usługi, czas, widełki ceny i wolne terminy.",
  },
  {
    href: "/travel",
    icon: "TR",
    label: "Zaplanuj podróż",
    description: "Pogoda, waluty, święta i rekomendacja wyjazdu.",
  },
  {
    href: "/react",
    icon: "RE",
    label: "Agent ReAct",
    description: "Agent, który używa narzędzi krok po kroku.",
  },
  {
    href: "/chat",
    icon: "VI",
    label: "Chat z Vie",
    description: "Główna rozmowa z Twoją personą AI.",
  },
  {
    href: "/think",
    icon: "TH",
    label: "Tryb myślenia",
    description: "Analiza problemu i logiczne rozbijanie zadań.",
  },
  {
    href: "/generate",
    icon: "GR",
    label: "Generator grafik",
    description: "Tworzenie testowych grafik z promptu.",
  },
  {
    href: "/upload",
    icon: "KB",
    label: "Baza wiedzy",
    description: "Wklej dokumenty, cenniki i FAQ do Supabase RAG.",
  },
  {
    href: "/knowledge",
    icon: "PV",
    label: "Podgląd wiedzy",
    description: "Sprawdź fragmenty, źródła i testowe wyszukiwanie RAG.",
  },
  {
    href: "/fewshot",
    icon: "FS",
    label: "Słownik AI",
    description: "Przykłady stylu, tonu i gotowych formatów.",
  },
];

const travelBudgetPreview = {
  destination: "Berlin",
  people: 2,
  days: 3,
  style: "Standard",
  totalPln: 4738,
  perPersonPln: 2369,
  reservePln: 618,
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("pl-PL", {
    currency: "PLN",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatTime(iso?: string) {
  if (!iso) return "—";

  return new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  }).format(new Date(iso));
}

function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className="dashboard-skeleton-list" aria-label="Ładowanie danych">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className="dashboard-skeleton" />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  async function loadDashboard(showSpinner = false) {
    if (showSpinner) setRefreshing(true);
    setError("");

    try {
      const response = await fetch("/api/dashboard", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      const json = (await response.json()) as DashboardData;
      setData(json);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Nie udało się pobrać danych dashboardu.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    const weatherTimer = window.setInterval(() => loadDashboard(), 15 * 60_000);
    const ratesTimer = window.setInterval(() => loadDashboard(), 60 * 60_000);

    return () => {
      window.clearInterval(weatherTimer);
      window.clearInterval(ratesTimer);
    };
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Dzień dobry";
    if (hour < 18) return "Dobrego popołudnia";
    return "Dobry wieczór";
  }, []);

  return (
    <main className="dashboard-shell">
      <button
        className="dashboard-mobile-toggle"
        type="button"
        aria-label="Otwórz menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>

      <aside className={`dashboard-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="dashboard-brand">
          <span>AI</span>
          <div>
            <strong>Mój Agent</strong>
            <small>panel pracy</small>
          </div>
        </div>

        <AppNav active="/" />
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">Lekcja 4 · Dashboard</p>
            <h1>
              {greeting}!{" "}
              <span>{data?.currentDate.label ?? "Ładuję aktualne dane..."}</span>
            </h1>
          </div>

          <button
            className="dashboard-refresh"
            type="button"
            onClick={() => loadDashboard(true)}
            disabled={refreshing}
          >
            <span className={refreshing ? "spin" : ""}>↻</span>
            {refreshing ? "Odświeżam" : "Odśwież"}
          </button>
        </header>

        {error ? (
          <div className="dashboard-error" role="alert">
            Nie udało się pobrać części danych: {error}
          </div>
        ) : null}

        <section className="dashboard-grid" aria-label="Dane operacyjne">
          <article className="dashboard-card dashboard-card-weather">
            <div className="dashboard-card-head">
              <span>PO</span>
              <div>
                <h2>Pogoda</h2>
                <p>Warszawa · odświeżanie co 15 minut</p>
              </div>
            </div>

            {loading || !data ? (
              <SkeletonLines />
            ) : (
              <>
                <div className="dashboard-big-value">
                  {data.weather.data.temperatureC ?? "—"}°C
                </div>
                <p className="dashboard-muted">{data.weather.data.description}</p>
                <div className="dashboard-metrics">
                  <span>Wiatr: {data.weather.data.windKmh ?? "—"} km/h</span>
                  <span>
                    Wilgotność: {data.weather.data.humidityPercent ?? "—"}%
                  </span>
                </div>
                <footer>
                  Źródło: {data.weather.source} · aktualizacja{" "}
                  {formatTime(data.weather.updatedAt)}
                </footer>
              </>
            )}
          </article>

          <article className="dashboard-card dashboard-card-rates">
            <div className="dashboard-card-head">
              <span>FX</span>
              <div>
                <h2>Kursy walut</h2>
                <p>EUR, USD i GBP · odświeżanie co godzinę</p>
              </div>
            </div>

            {loading || !data ? (
              <SkeletonLines />
            ) : (
              <>
                <div className="dashboard-rate-list">
                  {data.rates.map((rate) => (
                    <div key={rate.data.code}>
                      <strong>{rate.data.code}</strong>
                      <span>
                        {rate.data.rate?.toFixed(4) ?? "—"} PLN
                      </span>
                      <small>{rate.data.date}</small>
                    </div>
                  ))}
                </div>
                <footer>
                  Źródło: {data.rates.map((rate) => rate.source).join(", ")} ·{" "}
                  aktualizacja {formatTime(data.rates[0]?.updatedAt)}
                </footer>
              </>
            )}
          </article>

          <article className="dashboard-card dashboard-card-holidays">
            <div className="dashboard-card-head">
              <span>ŚW</span>
              <div>
                <h2>Najbliższe święta</h2>
                <p>Polska · rok 2026</p>
              </div>
            </div>

            {loading || !data ? (
              <SkeletonLines count={4} />
            ) : data.holidays.data.length ? (
              <>
                <div className="dashboard-holiday-list">
                  {data.holidays.data.map((holiday) => (
                    <div key={holiday.date}>
                      <strong>{holiday.localName}</strong>
                      <span>{holiday.date}</span>
                      <small>
                        {holiday.daysLeft === 0
                          ? "dzisiaj"
                          : `za ${holiday.daysLeft} dni`}
                      </small>
                    </div>
                  ))}
                </div>
                <footer>
                  Źródło: {data.holidays.source} · aktualizacja{" "}
                  {formatTime(data.holidays.updatedAt)}
                </footer>
              </>
            ) : (
              <p className="dashboard-muted">Brak kolejnych świąt w danych.</p>
            )}
          </article>

          <article className="dashboard-card dashboard-card-budget">
            <div className="dashboard-card-head">
              <span>BU</span>
              <div>
                <h2>Budżet podróży</h2>
                <p>Nowa funkcja asystenta podróży</p>
              </div>
            </div>

            <div className="dashboard-budget-main">
              <strong>{formatMoney(travelBudgetPreview.totalPln)}</strong>
              <span>
                {travelBudgetPreview.destination} · {travelBudgetPreview.people} osoby ·{" "}
                {travelBudgetPreview.days} dni · {travelBudgetPreview.style}
              </span>
            </div>

            <div className="dashboard-metrics">
              <span>Na osobę: {formatMoney(travelBudgetPreview.perPersonPln)}</span>
              <span>Rezerwa: {formatMoney(travelBudgetPreview.reservePln)}</span>
            </div>

            <p className="dashboard-muted">
              Karta pokazuje szybki koszt wyjazdu, a pełny panel pozwala zmienić liczbę osób,
              liczbę dni, transport i poziom komfortu.
            </p>

            <Link className="dashboard-card-link" href="/travel">
              Otwórz asystenta budżetu
            </Link>
          </article>

          <article className="dashboard-card dashboard-card-actions">
            <div className="dashboard-card-head">
              <span>GO</span>
              <div>
                <h2>Szybkie akcje</h2>
                <p>Przejdź do gotowych modułów agenta</p>
              </div>
            </div>

            <div className="dashboard-action-grid">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <span>{action.icon}</span>
                  <strong>{action.label}</strong>
                  <small>{action.description}</small>
                </Link>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

