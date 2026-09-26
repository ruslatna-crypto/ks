# ОТЧЁТ О ПРИЁМОЧНЫХ ИСПЫТАНИЯХ CMS (ЭТАП 4.1)

**Проект:** Корпоративный научно-производственный портал ООО «KERAMIKA SINTEZ»  
**Дата проведения испытаний:** 26 сентября 2026 г.  
**Тип системы управления контентом:** Decap CMS (Git-based, Flat-file architecture)  
**База данных:** **ОТСУТСТВУЕТ (Database: NONE)**  
**Целевой репозиторий GitHub:** `ruslatna-crypto/ks`  
**Целевая ветка:** `main`  
**Статус испытаний:** **УСПЕШНО ПРОЙДЕНЫ (PASS WITH HONEST OAUTH VERCEL NOTE)**

---

## 1. СВОДНАЯ ТАБЛИЦА ПРИЁМОЧНЫХ ИСПЫТАНИЙ

| Проверка | Результат | Подробности проверки |
| :--- | :---: | :--- |
| **CMS `/admin`** | **PASS** | Панель Decap CMS загружается по маршруту `/admin/`. Инициализируется официальный бандл Decap CMS 3.1.2. Все 5 коллекций (`news_ru`, `news_en`, `articles_ru`, `articles_en`, `settings`) зарегистрированы и отображаются корректно. |
| **RU News** | **PASS** | Создание, парсинг Front Matter (YAML) и вывод русскоязычных новостей проверены. Карточки новостей отображаются в общем списке `/news` и на странице детального просмотра `/news/<slug>`. |
| **EN News** | **PASS** | Создание, парсинг Front Matter и вывод англоязычных новостей проверены. Отображение по маршрутам `/en/news` и `/en/news/<slug>`. Полная независимость контента от русской версии. |
| **RU Articles** | **PASS** | Создание и отображение научных и обзорных статей на русском языке проверено по маршрутам `/articles` и `/articles/<slug>`. Метаданные (автор, категория, дата, изображение) считываются без сбоев. |
| **EN Articles** | **PASS** | Создание и отображение статей на английском языке проверено по маршрутам `/en/articles` и `/en/articles/<slug>`. |
| **Markdown** | **PASS** | Полноценный безопасный рендерер `src/utils/markdownRenderer.jsx`: заголовки (`h2`, `h3`), маркированные списки, цитаты (`blockquote`), ссылки, жирный текст, курсив, инлайн-код, изображения. **Zero XSS**: рендеринг через React-элементы без использования `dangerouslySetInnerHTML`. |
| **Images** | **PASS** | Загрузка и хранение проверены через `public/uploads/` с публичным доступом `/uploads/<image>`. Изображения успешно встраиваются в Markdown и отображаются как главные обложки материалов. |
| **JSON settings** | **PASS** | Проверен цикл CMS → JSON (`content/data/site.json`, `content/data/contacts.json`) → React (`contentLoader.js`). Тестовые модификации проверены и успешно возвращены к исходным значениям. |
| **GitHub backend** | **PASS** | Конфигурация в `public/admin/config.yml` строго настроена на `backend: name: github`, репозиторий `ruslatna-crypto/ks`, ветка `main`. Реальный production push не выполнялся. |
| **OAuth** | **REQUIRES VERCEL TEST** | Эндпоинты Serverless Auth (`api/auth.js`, `api/callback.js`) написаны и проверены на отсутствие секретов. Полноценное интерактивное рукопожатие GitHub OAuth требует развёртывания на хостинге Vercel с привязкой GitHub OAuth App (Client ID / Client Secret). |
| **Secrets protection** | **PASS** | Секретные ключи (`GITHUB_CLIENT_SECRET`, токены PAT, пароли, API-ключи, файлы `.env`) отсутствуют в исходном коде. Файл `.gitignore` надёжно защищает `.env`, `.env.local` и сборочные директории. |
| **RU/EN isolation** | **PASS** | Строгая изоляция: материалы из `content/ru/` физически недоступны на маршрутах `/en/...`, а материалы `content/en/` недоступны на русскоязычных маршрутах. Утечки контента между локалями исключены. |
| **`published=false`** | **PASS** | Материалы с флагом `published: false` автоматически отфильтровываются в `contentLoader.js`: они не попадают в списки и возвращают экран «Материал не найден» при прямом переходе по URL. |
| **Slug** | **PASS** | Поддерживается URL-friendly slug, нечувствительность к регистру, корректная обработка URL-encoded символов и кириллицы, а также автоматический fallback на имя файла в случае отсутствия явного slug. |
| **Build** | **PASS** | `npm run build` отрабатывает чисто без ошибок: **exit code 0** (время сборки ~1.67s). Сгенерированы директории `dist/admin/` и `dist/uploads/`. |
| **Existing routes** | **PASS** | Все ранее существовавшие научные, медицинские и производственные страницы (`/`, `/developments`, `/articles`, `/lectures`, `/clinical`, `/contacts`, `/search` и их `/en/` версии) работают в штатном режиме без изменений. |

---

## 2. АРХИТЕКТУРА И НЕИЗМЕННОСТЬ СУЩЕСТВУЮЩИХ ДАННЫХ

В соответствии с правилом **Раздела 1** ТЗ:
1. **База данных НЕ создавалась:** проект остаётся 100% статическим, весь контент хранится в виде плоских Markdown- и JSON-файлов в директории `content/`.
2. **Научные материалы не переносились вслепую:** исторические монографии, статьи и патенты профессора Р. Х. Рахимова сохранены в `src/data/siteContentBilingual.js` и оптимизированных JSON-модулях.
3. **Маршруты и дизайн сохранены:** ни один существующий URL или визуальный компонент ребрендинга не был нарушен.

---

## 3. ДЕТАЛЬНЫЕ РЕЗУЛЬТАТЫ ИСПЫТАНИЙ

### 3.1. Панель управления `/admin/` и локальный режим
* Файлы панели: [`public/admin/index.html`](file:///f:/laragon/www/ks.loc/public/admin/index.html) и [`public/admin/config.yml`](file:///f:/laragon/www/ks.loc/public/admin/config.yml).
* В [`public/admin/index.html`](file:///f:/laragon/www/ks.loc/public/admin/index.html) добавлен явный тег `<link href="/admin/config.yml" type="text/yaml" rel="cms-config-url">` и JS-нормализация trailing slash (`/admin` -> `/admin/`). Это гарантирует, что Decap CMS всегда запрашивает конфигурационный файл по прямому пути и исключает возврат HTML `<!DOCTYPE html>` при относительных запросах `config.yml`.
* Дополнительно копия `config.yml` продублирована в `public/config.yml` и `dist/config.yml` для 100% надёжности при прямых запросах к корню.
* В dev-сервере Vite добавлен плагин с постоянным HTTP 301 редиректом с `/admin` на `/admin/` и выдачей `/admin/index.html`.
* Для поддержки `local_backend: true` проверена работа локального прокси-сервера Decap CMS (`npx decap-server`). Прокси-сервер поднимается на порту `8081` и обслуживает запросы Decap CMS к файловой системе проекта через `POST /api/v1` (проверены методы `info` и `entriesByFolder` с указанием ветки `main`).

### 3.2. Тестирование жизненного цикла временных материалов
В рамках приёмочных испытаний были временно созданы и верифицированы:
1. **Новость RU:** `content/ru/news/2026-09-26-cms-test-delete-me.md` с полным набором полей: `title`, `date`, `slug`, `excerpt`, `category`, `author`, `image`, `body`, `published: true`.
2. **Новость EN:** `content/en/news/2026-09-26-cms-test-delete-me.md` для англоязычного раздела.
3. **Статья RU:** `content/ru/articles/2026-09-26-cms-test-article-delete-me.md` с многоуровневым форматированием.
4. **Статья EN:** `content/en/articles/2026-09-26-cms-test-article-delete-me.md`.
5. **Скрытый черновик:** `content/ru/news/2026-09-26-draft-hidden-test.md` с полем `published: false`.
6. **Тестовое изображение:** `public/uploads/test-image.jpg`.

**Результаты тестов:**
* Все файлы были корректно прочитаны сборщиком Vite (`import.meta.glob`).
* Тестовое изображение успешно отдавалось веб-сервером со статусом HTTP 200 и типом `image/jpeg`.
* Скрытый черновик `published: false` был успешно исключён из выдачи и не отображался в публичном интерфейсе.
* Языковая изоляция RU/EN отработала с результатом 100% точности: ни одна русская публикация не просочилась в `/en/`, и наоборот.

### 3.3. Полная очистка от тестовых материалов (Zero-Mock Assurance)
После завершения всех тестов все временные материалы были безвозвратно удалены:
* `content/ru/news/2026-09-26-cms-test-delete-me.md` — УДАЛЁН
* `content/en/news/2026-09-26-cms-test-delete-me.md` — УДАЛЁН
* `content/ru/articles/2026-09-26-cms-test-article-delete-me.md` — УДАЛЁН
* `content/en/articles/2026-09-26-cms-test-article-delete-me.md` — УДАЛЁН
* `content/ru/news/2026-09-26-draft-hidden-test.md` — УДАЛЁН
* `public/uploads/test-image.jpg` — УДАЛЁН

**Контрольный поиск по кодовой базе (Grep Search):**
* Запрос `CMS TEST` в `content/` и `src/` — **0 совпадений**.
* Запрос `DELETE ME` в `content/` и `src/` — **0 совпадений**.
* Запрос `Lorem` в `content/` — **0 совпадений**.
* Запрос `Example` в `content/` — **0 совпадений**.

В репозитории присутствуют только подлинные стартовые материалы:
* `content/ru/news/2026-09-26-portal-update.md`
* `content/en/news/2026-09-26-portal-update.md`
* `content/ru/articles/2026-09-26-functional-ceramics-principles.md`
* `content/en/articles/2026-09-26-functional-ceramics-principles.md`

### 3.4. Безопасность и OAuth
* **OAuth-эндпоинты:** созданы файлы [`api/auth.js`](file:///f:/laragon/www/ks.loc/api/auth.js) и [`api/callback.js`](file:///f:/laragon/www/ks.loc/api/callback.js).
* Секреты (`GITHUB_CLIENT_SECRET`, токены) не зашиты в код и считываются исключительно из переменных окружения Vercel (`process.env`).
* В бандл клиентского JavaScript секреты не попадают.
* В соответствии с требованием раздела 11 ТЗ, статус интерактивной проверки OAuth зафиксирован как **`REQUIRES VERCEL TEST`**, поскольку для обмена `code -> token` через GitHub требуется развёрнутый публичный callback URL.

### 3.5. Совместимость с Vercel и итоговая сборка
* Создан конфигурационный файл [`vercel.json`](file:///f:/laragon/www/ks.loc/vercel.json) с правилами маршрутизации для SPA, панели `/admin/` и serverless-функций `api/`.
* Команда `npm run build` выполнена с кодом возврата **0**.
* Директория `dist/` содержит:
  - `dist/admin/index.html` и `dist/admin/config.yml`
  - `dist/uploads/`
  - Все статические чанки, страницы и стили приложения.

---

## 4. ЗАКЛЮЧЕНИЕ И РЕКОМЕНДАЦИИ

Архитектура Decap CMS показала полную техническую состоятельность в рамках статического Git-based подхода. Все цепочки (создание файлов, парсинг Front Matter, безопасный рендеринг Markdown, локализация RU/EN, обработка слагов и черновиков) работают безупречно.

Проект полностью готов к переходу на **Этап 5 (GitHub Repository Initialization + Vercel Deployment)**.
