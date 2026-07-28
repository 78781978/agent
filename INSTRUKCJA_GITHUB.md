# DO_GITHUB_L9_W2_CRON_JOB_20260728

To jest paczka pliku do wgrania na GitHub dla Lekcji 9 / W2 Cron Job.

## Co wgrac

Wgraj plik:

- `vercel.json`

Plik musi znalezc sie w glownym katalogu repozytorium `agent`, obok `package.json`.

## Co dodaje

Dodaje konfiguracje Vercel Cron:

```json
"crons": [
  {
    "path": "/api/cron/morning",
    "schedule": "0 7 * * *"
  }
]
```

To oznacza, ze Vercel codziennie o 7:00 UTC uruchomi endpoint:

`/api/cron/morning`

W Polsce latem jest to 9:00 rano.

## Po wgraniu na GitHub

1. Vercel zrobi redeploy automatycznie.
2. Wejdz w Vercel -> projekt `agent` -> Settings -> Cron Jobs.
3. Powinnas zobaczyc cron dla `/api/cron/morning`.

## Wazne

Endpoint `/api/cron/morning` musi juz istniec w projekcie. Zostal dodany w W1.
