# Lekcja 6 / W1 - pgvector

Status: wykonane poprawnie.

Sprawdzenie wykonane 2026-07-16:

- Plik instrukcji `W1_PGVECTOR.md` wymaga wlaczenia pgvector w Supabase.
- Projekt ma skonfigurowane zmienne Supabase w `.env.local`.
- Test live przez Supabase REST potwierdzil, ze tabela `documents` jest dostepna.
- Test live przez Supabase RPC potwierdzil, ze funkcja `match_documents` jest dostepna.

Wyniki techniczne:

- `DOCUMENTS_TABLE_HTTP 200`
- `MATCH_DOCUMENTS_RPC_HTTP 200`

Uwaga:

W lokalnym katalogu `supabase/migrations` jest tylko migracja z lekcji 5. Warsztat W1 byl instrukcja do wykonania recznie w panelu Supabase, wiec brak lokalnej migracji SQL nie blokuje zaliczenia, ale w przyszlosci warto dodac osobny plik migracji z tabela `documents` i funkcja `match_documents`.
