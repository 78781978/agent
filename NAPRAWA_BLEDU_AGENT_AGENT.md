# Naprawa błędu `app/agent/agent/page.tsx`

Build Vercel pada, bo na GitHubie został przypadkowo utworzony zły folder:

```text
app/agent/agent/page.tsx
```

Ten folder trzeba usunąć w całości:

```text
app/agent/agent
```

Prawidłowy plik ma być tylko tutaj:

```text
app/agent/page.tsx
```

## Co zrobić na GitHubie

1. Wejdź w repozytorium `78781978/agent`.
2. Wejdź w folder:

```text
app/agent/agent
```

3. Otwórz plik:

```text
page.tsx
```

4. Kliknij ikonę ołówka.
5. Kliknij trzy kropki przy edycji pliku.
6. Wybierz `Delete file`.
7. Zatwierdź zmianę przyciskiem `Commit changes`.

Potem upewnij się, że w repozytorium została taka struktura:

```text
app/
  agent/
    page.tsx
```

Nie może być:

```text
app/
  agent/
    agent/
      page.tsx
```

Po usunięciu złego folderu Vercel powinien zbudować projekt poprawnie.
