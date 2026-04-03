# Avito AI Seller Workspace

Стартовый frontend-шаблон для тестового задания Авито: Vite + React + TypeScript с заранее подключенными Router, Redux Toolkit, Tailwind CSS, ESLint, Prettier, Husky и workspace-конфигом для Figma MCP.

## Что уже настроено

- React + Vite + TypeScript
- React Router с маршрутами `/ads`, `/ads/:id`, `/ads/:id/edit`
- Redux Toolkit + `react-redux`
- Tailwind CSS v4 и базовые UI-компоненты
- ESLint flat config
- Prettier + `prettier-plugin-tailwindcss`
- Husky + `lint-staged` для pre-commit
- `.vscode/mcp.json` для Figma MCP

## Быстрый старт

```bash
npm install
npm run dev
```

Дополнительные команды:

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
npm run build
```

## Структура

```text
src/
  app/                # store, providers, router
  features/           # redux slices и feature-специфичная логика
  pages/              # маршрутизируемые страницы
  shared/lib/         # утилиты и демо-данные
  shared/ui/          # примитивы интерфейса
```

## Husky

Pre-commit хук запускает `lint-staged`, который прогоняет ESLint и Prettier только по изменённым файлам.

Если репозиторий ещё не инициализирован, выполните:

```bash
git init
npm run prepare
```
