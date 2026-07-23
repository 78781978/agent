import "./globals.css";
import { AuthGate } from "../components/AuthGate";

export const metadata = {
  title: "Mój Agent AI",
  description: "Pierwszy agent AI z kursu Laba",
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
