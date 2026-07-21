# Lekcja 5 — Warsztat 2

- Historia rozmów jest zapisywana do Supabase.
- Pierwsza wiadomość tworzy rozmowę i tytuł do 50 znaków.
- Wiadomości użytkownika i agenta trafiają do tabeli `messages`.
- `updated_at` rozmowy jest aktualizowane po każdej wiadomości.
- Po odświeżeniu wczytywana jest ostatnia aktywna rozmowa.
- Podczas wczytywania widoczny jest komunikat ładowania.
- Przycisk „Nowa rozmowa” czyści czat i tworzy nowy rekord.

Implementacja korzysta z oficjalnego REST API Supabase, ponieważ instalacja pakietu
`@supabase/supabase-js` była zablokowana przez brak dostępu do rejestru npm.
