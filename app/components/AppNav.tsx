"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "../lib/auth-client";

const menuItems = [
  { href: "/", label: "Dashboard" },
  { href: "/chat", label: "Chat Vie" },
  { href: "/agent", label: "Agent" },
  { href: "/react", label: "ReAct" },
  { href: "/travel", label: "Podróże" },
  { href: "/think", label: "Myślenie" },
  { href: "/fewshot", label: "Słownik AI" },
  { href: "/format", label: "Formater" },
  { href: "/search", label: "Szukaj" },
  { href: "/generate", label: "Grafiki" },
  { href: "/email-triage", label: "E-mail Triage" },
  { href: "/history", label: "Historia" },
  { href: "/upload", label: "Baza wiedzy" },
  { href: "/knowledge", label: "Podgląd wiedzy" },
  { href: "/wash", label: "Myjnia marketing" },
  { href: "/wash-booking", label: "Myjnia rezerwacje" },
];

type AppNavProps = {
  active?: string;
};

export function AppNav({ active }: AppNavProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
  }

  return (
    <nav className="top-nav agent-main-nav" aria-label="Nawigacja">
      <button className="nav-sign-out nav-sign-out-top" type="button" onClick={handleSignOut}>
        Wyloguj
      </button>
      {menuItems.map((item) => (
        <Link
          className={active === item.href ? "active" : undefined}
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
