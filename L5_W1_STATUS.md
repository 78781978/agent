# Lekcja 5 — Warsztat 1

## Wdrożone w projekcie

- Dodano wzór zmiennych Supabase w `.env.supabase.example` bez modyfikowania istniejących kluczy Google.
- Dodano migrację `supabase/migrations/202607140001_lesson_05_setup.sql`.
- Migracja tworzy puste tabele `conversations`, `messages` i `user_profiles`.
- Kolumny, typy i wartości domyślne odpowiadają instrukcji warsztatu.
- `messages.conversation_id` jest powiązane z `conversations.id`; usunięcie rozmowy usuwa jej wiadomości.
- RLS jest wyłączone zgodnie z wymaganiem warsztatu (ma zostać włączone w lekcji 7).

## Krok zależny od konta

Prawdziwe wartości Project URL i anon/public key należy dopisać do `.env.local`, a migrację wykonać w SQL Editor projektu Supabase.
