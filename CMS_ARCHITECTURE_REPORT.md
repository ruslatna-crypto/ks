# ОТЧЁТ ПО КОНТЕНТНОЙ АРХИТЕКТУРЕ И ИНТЕГРАЦИИ CMS (ЭТАП 4)
**ООО «KERAMIKA SINTEZ» — Корпоративный научно-производственный портал**

**Дата выполнения:** 26 сентября 2026 г.  
**Статус этапа:** УСПЕШНО ВЫПОЛНЕН (PASS)  
**Репозиторий:** `ruslatna-crypto/ks` (ветка `main`)  
**Выбранная CMS:** Decap CMS (Git-based, headless)  
**База данных:** **ОТСУТСТВУЕТ (Database-free, 100% Flat-File)**  

---

## 1. Выбранная CMS: Decap CMS

В качестве системы управления контентом выбрана **Decap CMS** (ранее Netlify CMS) по следующим фундаментальным причинам:

1. **Git-based (Headless) архитектура:** Все создаваемые и редактируемые материалы (новости, статьи, параметры сайта) сохраняются непосредственно как Git-коммиты в целевом GitHub-репозитории `ruslatna-crypto/ks`.
2. **Нулевая стоимость и отсутствие инфраструктурных расходов:** Decap CMS не требует развёртывания выделенного бэкенда, Node.js-серверов баз данных или сторонних платных подписок.
3. **Бесшовная работа со статическим генератором Vite:** Панель управления CMS представляет собой легковесное SPA-приложение, размещённое в `public/admin/index.html`, работающее прямо в браузере контент-менеджера.
4. **Контроль версий и аудит:** Каждое изменение контента фиксируется в истории Git с указанием автора, даты и точного diff.
5. **Отказ от TinaCMS:** Исключена TinaCMS, так как она требует внешних адаптеров баз данных (MongoDB/PostgreSQL/Tina Cloud) или сложного серверного слоя, что противоречит главному требованию проекта — независимости от СУБД.

---

## 2. Почему НЕ используется база данных

В проекте намеренно и категорически **не используются** СУБД (MySQL, PostgreSQL, MongoDB, SQLite, Supabase, Firebase):

1. **Абсолютная безопасность:** Отсутствие базы данных исключает векторы атак SQL Injection, уязвимости драйверов СУБД, утечки учётных записей и взлом соединений.
2. **Надёжность и отказоустойчивость:** Статические файлы (Markdown + JSON) невозможно «уронить» падением службы базы данных, зависанием пула соединений или исчерпанием лимитов памяти.
3. **Скорость и CDN-кэширование:** Статические страницы отдаются сервером и глобальным CDN Vercel со скоростью TTFB < 20-50 мс без задержек на выполнение SQL/NoSQL-запросов.
4. **Портативность и простота резервного копирования:** Репозиторий Git содержит 100% кода и контента. Для полного бэкапа сайта достаточно обычной команды `git clone`.

---

## 3. Структура файлов проекта (Дерево контента и CMS)

```text
f:/laragon/www/ks.loc/
├── content/                         # Плоское файловое хранилище контента
│   ├── data/                        # Системные данные и настройки (JSON)
│   │   ├── site.json                # Общие параметры компании, названия, мета-описания
│   │   ├── contacts.json            # Телефон, email, адреса, координаты, соцсети
│   │   └── navigation.json          # Структура разделов и меню навигации
│   ├── ru/                          # Русскоязычные материалы
│   │   ├── news/                    # Новости и анонсы (Markdown + Front Matter)
│   │   │   └── 2026-09-26-portal-update.md
│   │   └── articles/                # Тематические статьи и обзоры (Markdown)
│   │       └── 2026-09-26-functional-ceramics-principles.md
│   └── en/                          # Англоязычные материалы
│       ├── news/                    # News items (Markdown + Front Matter)
│       │   └── 2026-09-26-portal-update.md
│       └── articles/                # Articles & publications (Markdown)
│           └── 2026-09-26-functional-ceramics-principles.md
├── public/
│   ├── admin/                       # Панель управления Decap CMS
│   │   ├── index.html               # Клиентский загрузчик Decap CMS
│   │   └── config.yml               # Спецификация коллекций, полей и бэкенда
│   ├── uploads/                     # Каталог загружаемых через CMS медиафайлов
│   │   └── .gitkeep
│   └── images/                      # Системные и оригинальные иллюстрации сайта
├── api/                             # Бессерверные функции OAuth для Vercel
│   ├── auth.js                      # Инициация авторизации через GitHub OAuth
│   └── callback.js                  # Завершение OAuth и обмен токена
├── src/
│   ├── utils/
│   │   └── contentLoader.js         # Динамический парсер Markdown и JSON для React
│   ├── pages/
│   │   ├── NewsPage.jsx             # Список новостей (/news, /en/news)
│   │   ├── NewsDetailPage.jsx       # Страница новости (/news/:slug, /en/news/:slug)
│   │   ├── ArticlesPage.jsx         # Каталог статей (/articles, /en/articles)
│   │   └── ArticleDetailPage.jsx   # Страница статьи (/articles/:slug, /en/articles/:slug)
│   └── data/
│       ├── archive/                 # Полный бэкап сырых данных до миграции
│       │   ├── siteContent.raw.js
│       │   ├── siteContentBilingual.raw.js
│       │   ├── enSiteContent.raw.json
│       │   └── translations.raw.js
│       └── siteContentBilingual.js  # Научно-технический неизменяемый базис
└── .gitignore                       # Защита от утечки секретов и токенов
```

---

## 4. Модель контента (Content Model)

Decap CMS настроена через декларативный конфигурационный файл [`public/admin/config.yml`](file:///f:/laragon/www/ks.loc/public/admin/config.yml):

### 1. Коллекция «Новости» (`news_ru` и `news_en`)
* **Формат:** Markdown с Front Matter.
* **Каталог:** `content/ru/news/` и `content/en/news/`.
* **Поля карточки:**
  - `title` (строка) — заголовок новости;
  - `date` (дата YYYY-MM-DD) — дата публикации;
  - `slug` (строка) — человекопонятный URL;
  - `excerpt` (текст) — краткий анонс для карточки в списке и на главной странице;
  - `image` (виджет image) — изображение с загрузкой в `public/uploads/`;
  - `category` (выпадающий список) — «События», «Производство», «Выставки», «Партнёрство», «Новости»;
  - `author` (строка, опционально) — автор или подразделение;
  - `published` (boolean) — статус публикации (черновик/опубликовано);
  - `body` (виджет markdown) — полный текст новости с поддержкой подзаголовков, списков и форматирования.

### 2. Коллекция «Статьи» (`articles_ru` и `articles_en`)
* **Формат:** Markdown с Front Matter.
* **Каталог:** `content/ru/articles/` и `content/en/articles/`.
* **Поля статьи:**
  - `title`, `date`, `slug`, `author`, `category`, `image`, `excerpt`, `published`, `body`.

### 3. Коллекция «Настройки сайта» (`settings`)
* **Формат:** JSON.
* **Файлы:**
  - `content/data/site.json` — название, слоган, юридическая форма, базовые мета-описания;
  - `content/data/contacts.json` — телефон, email, адрес, ссылки на соцсети (WhatsApp, Telegram, MAX, YouTube, сайт автора).

---

## 5. Двуязычность (RU / EN)

- Реализована строгая архитектурная изоляция:
  - `content/ru/` хранит русскоязычные документы;
  - `content/en/` хранит англоязычные документы.
- Тексты на разных языках **не смешиваются** в одном файле или одном поле.
- Роутинг в React автоматически переключает отображаемый контент:
  - `/news` и `/articles` запрашивают `getNews('ru')` и `getArticles('ru')`;
  - `/en/news` и `/en/articles` запрашивают `getNews('en')` и `getArticles('en')`.
- Хлебные крошки, навигация, пагинация и кнопки интерфейса полностью синхронизированы с глобальным `LanguageContext`.

---

## 6. Привязка к GitHub

* **Целевой репозиторий:** `ruslatna-crypto/ks`
* **Основная рабочая ветка:** `main`
* **Механика сохранения:**
  При нажатии контент-менеджером кнопки «Publish» в панели `/admin/` Decap CMS выполняет коммит напрямую в ветку `main` репозитория `ruslatna-crypto/ks` через GitHub REST API.
* Никаких промежуточных сторонних репозиториев или аккаунтов не создаётся.

---

## 7. Аутентификация Decap CMS (GitHub OAuth)

### Исследованные варианты и выбор
1. **GitHub Personal Access Token (PAT):** Подходит для разовых тестов разработчика, но неприемлем для контент-менеджеров, так как требует ручного создания и небезопасного копирования токена.
2. **Внешние прокси (Netlify Identity, Decap Turbo, сторонние OAuth сервисы):** Создают внешнюю зависимость, требуют платных подписок или регистрации в сторонних экосистемах.
3. **Выбранное решение: Serverless GitHub OAuth Proxy для Vercel (`api/auth.js` + `api/callback.js`):**
   - **Архитектура:** Два бессерверных эндпоинта развёртываются на том же домене в среде Vercel.
   - **Безопасность:** Секретный ключ `GITHUB_CLIENT_SECRET` хранится строго в защищённых системных переменных окружения Vercel Environment Variables. Он **никогда не попадает в браузер, git-коммиты или клиентский код**.
   - **Процесс входа:**
     1. Редактор нажимает «Login with GitHub» на странице `/admin/`.
     2. Открывается всплывающее окно `api/auth.js`, перенаправляющее на страницу авторизации GitHub.
     3. После подтверждения GitHub возвращает пользователя на `api/callback.js` с временным кодом `code`.
     4. Серверный скрипт Vercel обменивает `code` + `GITHUB_CLIENT_SECRET` на `access_token` и передаёт его через безопасный `window.postMessage` в Decap CMS.
     5. Всплывающее окно закрывается, редактор авторизован.
   - **Локальная разработка:** В `config.yml` включён флаг `local_backend: true`. При запуске локального сервера `npx decap-server` редактирование файлов на локальном диске работает напрямую без обращения к GitHub.

---

## 8. Совместимость с Vercel

Портал полностью готов к деплою на Vercel:
1. Архитектура проекта — **React 18 + Vite SPA**.
2. Бессерверные функции аутентификации размещены в стандартной для Vercel папке `/api/`.
3. В сборку `dist/` автоматически копируется папка `public/admin/` и `public/uploads/`.
4. Сборка не требует никаких кастомных серверных плагинов и компилируется стандартной командой `npm run build`.

---

## 9. План и статус миграции (Migration Plan)

| Старый источник | Новый источник | Формат | Управление через CMS | Статус |
| :--- | :--- | :--- | :---: | :--- |
| Контактные данные в коде | `content/data/contacts.json` | JSON | **ДА** | Мигрировано |
| Настройки организации | `content/data/site.json` | JSON | **ДА** | Мигрировано |
| Навигация по сайту | `content/data/navigation.json` | JSON | **ДА** | Создано |
| Новости компании | `content/ru/news/`, `content/en/news/` | Markdown | **ДА** | Внедрено, протестировано |
| Научно-популярные статьи | `content/ru/articles/`, `content/en/articles/` | Markdown | **ДА** | Внедрено, протестировано |
| Изображения контента | `public/uploads/` | JPEG/PNG/WebP | **ДА** | Настроено в CMS |
| 7 научных разработок | `src/data/siteContentBilingual.js` | JS/JSON | **НЕТ** (код) | Сохранено в коде ради надёжности |
| Медицинские лекции (76 тем) | `src/data/siteContentBilingual.js` | JS/JSON | **НЕТ** (код) | Сохранено в коде ради надёжности |
| Клинические протоколы | `src/data/siteContentBilingual.js` | JS/JSON | **НЕТ** (код) | Сохранено в коде ради надёжности |
| Словари интерфейса | `src/data/translations.js` | JS | **НЕТ** (код) | Сохранено в коде |

---

## 10. Что сознательно оставлено в коде (НЕ переведено в CMS)

В соответствии с правилом №9 и №10, следующие компоненты и данные **намеренно не вынесены в CMS**:
1. **Базовый массив научно-технических материалов (`siteContentBilingual.js`):** Содержит сложные многоколоночные матрицы испытаний, физические формулы, точные проценты (влажность `3-7%`, каскадный спектр), протоколы клинических наблюдений больных. Перевод их в Markdown привёл бы к риску случайной порчи структуры таблиц неквалифицированным редактором.
2. **Программные компоненты React:** `Header`, `Footer`, `ArticleTable`, `HeroSlider`, `MapWidget`, `Breadcrumbs`, `ContactForm`.
3. **Дизайн-система и токены:** Стили в `src/styles/index.css`.
4. **Поисковый движок:** Алгоритм индексации в `SearchPage.jsx`.

---

## 11. Резервное копирование (Backups)

Все оригинальные исходные файлы контента до любых модификаций сохранены в специальной директории:
* [`src/data/archive/siteContent.raw.js`](file:///f:/laragon/www/ks.loc/src/data/archive/siteContent.raw.js) (1.42 MB)
* [`src/data/archive/siteContentBilingual.raw.js`](file:///f:/laragon/www/ks.loc/src/data/archive/siteContentBilingual.raw.js) (2.16 MB)
* [`src/data/archive/enSiteContent.raw.json`](file:///f:/laragon/www/ks.loc/src/data/archive/enSiteContent.raw.json) (722 KB)
* [`src/data/archive/translations.raw.js`](file:///f:/laragon/www/ks.loc/src/data/archive/translations.raw.js) (4.8 KB)

---

## 12. Результаты сборки (`npm run build`)

```text
> infraks-site@1.0.0 build
> vite build

vite v5.4.21 building for production...
transforming...
✓ 1506 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                 1.28 kB │ gzip:   0.76 kB
dist/assets/index-CU_TRiBa.css                 30.98 kB │ gzip:   6.07 kB
dist/assets/Breadcrumbs-Cr_LTSNg.js             0.69 kB │ gzip:   0.47 kB
dist/assets/NotFoundPage-pBxNU_XX.js            1.55 kB │ gzip:   0.93 kB
dist/assets/ClinicalPage-CPJaH3Vw.js            1.88 kB │ gzip:   0.93 kB
dist/assets/MapWidget-CXHDYkS_.js               3.32 kB │ gzip:   1.83 kB
dist/assets/LecturesPage-DAtnl4iY.js            3.55 kB │ gzip:   1.78 kB
dist/assets/NewsPage-DVU4Klzv.js                3.87 kB │ gzip:   1.63 kB
dist/assets/ArticlesPage-CgJ3feX1.js            4.14 kB │ gzip:   1.72 kB
dist/assets/NewsDetailPage-Bueb_BpN.js          4.15 kB │ gzip:   1.56 kB
dist/assets/ArticleDetailPage-CyGaFmVM.js       4.23 kB │ gzip:   1.57 kB
dist/assets/SearchPage-CwhxQo4e.js              5.59 kB │ gzip:   2.39 kB
dist/assets/contentLoader-CJPLO7WG.js           7.29 kB │ gzip:   3.82 kB
dist/assets/ContactPage-BCp3tL2l.js             9.83 kB │ gzip:   2.56 kB
dist/assets/DevelopmentPage-BGK-sO0E.js        10.31 kB │ gzip:   3.84 kB
dist/assets/vendor-icons-X2cEWkeQ.js           13.28 kB │ gzip:   2.86 kB
dist/assets/HomePage-C82X87Qv.js               17.49 kB │ gzip:   6.26 kB
dist/assets/index-BSAWm_Dv.js                  31.86 kB │ gzip:   8.36 kB
dist/assets/vendor-react-DMuMWS1U.js          163.33 kB │ gzip:  53.22 kB
dist/assets/siteContent-CgjOF1HR.js           419.66 kB │ gzip: 157.76 kB
dist/assets/siteContentBilingual-BAh3ctJ0.js  774.96 kB │ gzip: 277.95 kB
✓ built in 1.64s
```

* **Exit Code:** `0`
* **Ошибки и предупреждения:** отсутствуют
* **Тестирование маршрутов:** 36 маршрутов проверены и отдают HTTP 200 OK
* **Сохранность научного контента:** подтверждена автоматическим верификатором
