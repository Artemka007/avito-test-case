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

## Figma MCP для VS Code

В workspace уже добавлен файл `.vscode/mcp.json`.

- При первом запуске VS Code попросит ввести `figma-api-key`
- Ключ не хранится в репозитории в открытом виде
- Сервер запускается через `npx @tmegit/figma-developer-mcp --stdio`

Чтобы активировать сервер:

1. Откройте Command Palette
2. Выполните `MCP: List Servers`
3. Найдите `figma` и запустите его

## Самостоятельные решения

- Для быстрого старта добавлены демо-страницы и базовый layout под задание, чтобы можно было сразу переходить к интеграции backend API и LLM.
- Состояние темы и вида списка хранится в Redux Toolkit и сохраняется в `localStorage`.
