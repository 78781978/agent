# Lekcja 6 / W2 - upload wiedzy do Supabase

Status: wykonane.

Co dodano:

- Strona `/upload` z formularzem do wklejania dokumentów.
- Endpoint `/api/embed` generujący embedding 768 wymiarów.
- Endpoint `/api/upload-knowledge` do zapisu, listowania i usuwania dokumentów.
- Funkcja `splitIntoChunks()` w `lib/chunking.ts`.
- Funkcja `embedText()` w `lib/embeddings.ts`.
- Link `Baza wiedzy` w dashboardzie.

Uwaga techniczna:

Instrukcja kursu wskazywała model `text-embedding-004`, ale Google API dla obecnego klucza zwróciło, że ten model nie jest dostępny dla `embedContent`. Dostępne modele embeddingów to m.in. `gemini-embedding-001`, dlatego wdrożono `gemini-embedding-001` z `outputDimensionality: 768`, żeby pasował do tabeli `documents.embedding vector(768)`.

Testy:

- `/upload` zwrócił HTTP 200.
- `/api/upload-knowledge` zwrócił HTTP 200.
- `/api/embed` zwrócił HTTP 200 i embedding o 768 wymiarach.
- Testowy dokument został zapisany do Supabase, pojawił się na liście i został usunięty.
- `npm run build` zakończył się sukcesem.
