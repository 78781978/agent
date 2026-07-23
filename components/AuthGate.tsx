"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, type AuthUser } from "../lib/auth-client";

type AuthGateProps = {
  children: ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(pathname !== "/login");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let active = true;

    async function checkUser() {
      if (pathname === "/login") {
        setChecking(false);
        return;
      }

      const currentUser = await getCurrentUser();

      if (!active) return;

      if (!currentUser) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      setUser(currentUser);
      setChecking(false);
    }

    void checkUser();

    return () => {
      active = false;
    };
  }, [pathname, router]);

  if (pathname !== "/login" && checking) {
    return (
      <main className="chat-shell">
        <section className="chat-card">
          <div className="empty-state">Sprawdzam logowanie...</div>
        </section>
      </main>
    );
  }

  if (pathname !== "/login" && !user) {
    return null;
  }

  return children;
}
