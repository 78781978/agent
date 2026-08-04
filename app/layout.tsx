import "./globals.css";
import { AuthGate } from "../components/AuthGate";

export const metadata = {
  title: "Vie AI — Twój osobisty agent",
  description: "Prywatny asystent AI, który zna Twoje dokumenty i pamięta rozmowy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
