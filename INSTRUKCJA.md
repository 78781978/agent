# Zmiana do GitHuba: Agent jak Chat Vie

Wgraj do repozytorium dokładnie ten plik:

- `app/agent/page.tsx`

Co zmieniono:

- dodano w `/agent` wybór trybu rozmowy: Casual, Ekspert, Kreatywny,
- dodano wybór modelu: Flash i Pro,
- wartości są wysyłane do `/api/agent` tak samo jak w Chat Vie,
- przy odpowiedzi agenta widać użyty tryb i model,
- build Next.js przechodzi poprawnie.

Test lokalny:

- `npm run build`: OK
