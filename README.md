# Sasha Alhimenkov — portfolio

Личное портфолио Саши Алхименкова: индекс проектов, двуязычные case study и студийные интерактивные инструменты. Интерфейс построен на React и vinext; все опубликованные изображения и видео хранятся внутри проекта.

## Локальный запуск

Требуется Node.js 22.13 или новее.

```bash
npm install
npm run dev
```

## Структура

- `app/projects.ts` — русские тексты, порядок проектов и локальные медиа.
- `app/localization.ts` — английская редакционная версия.
- `app/page.tsx` — индекс, case study, фильтры и интерактивные инструменты.
- `public/cases/` — финальные материалы кейсов.
- `docs/PORTFOLIO-CHECKPOINT.md` — решения, статус кейсов и QA-чеклист.

## Проверка

```bash
npm test -- --run
npm run lint
git diff --check
```

## Render

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Runtime: Node.js 22 или новее
- Environment: `NEXT_PUBLIC_SITE_URL` задаётся URL текущего деплоя. Постоянный canonical появится после подключения собственного домена.
