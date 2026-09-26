# ОТЧЁТ ПО ЭТАПУ 5: PRODUCTION DEPLOYMENT & SEO
## Корпоративный научно-производственный портал ООО «KERAMIKA SINTEZ»

---

## 1. Сводка этапа и репозиторий

| Параметр | Значение |
| :--- | :--- |
| **Организация / Бренд** | ООО «KERAMIKA SINTEZ» |
| **Production URL** | `https://ks-gray.vercel.app` |
| **GitHub репозиторий** | `ruslatna-crypto/ks` |
| **Основная ветка** | `main` |
| **Git Remote Origin** | `https://github.com/ruslatna-crypto/ks.git` |
| **Статус ветки** | `up to date with 'origin/main'`, рабочее дерево чистое |
| **Архитектура** | React + Vite + Decap CMS + Markdown/JSON + Vercel (Flat-File, **NO DATABASE**) |
| **Команда сборки** | `npm run build` (`vite build`) |
| **Результат сборки** | **Exit Code: 0** (1.65 сек, 1508 модулей, без ошибок) |
| **Каталог сборки** | `dist` |

---

## 2. Production Smoke Test (23 контрольных пункта)

В соответствии с критическим правилом: **не указывать PASS для проверок, требующих внешних секретов или действий пользователя в сторонних сервисах**.

| № | Проверка | Результат | Комментарий / Фактическое состояние |
| :--- | :--- | :--- | :--- |
| 1 | **Главная страница** | **PASS** | HTTP 200, рендеринг Hero, слайдера, разработок, карты, футера. |
| 2 | **RU страницы** | **PASS** | Все 18 RU-маршрутов (`/sushka`, `/plenka`, `/steril`, `/lamp`, `/cotton`, `/paint`, `/metod`, `/virus`, `/metodika`, `/klinik`, `/contact`, `/search` и др.) функционируют. |
| 3 | **EN страницы** | **PASS** | Все 18 EN-маршрутов (`/en`, `/en/news`, `/en/articles`, `/en/contact`, `/en/sushka` и др.) функционируют. |
| 4 | **News** | **PASS** | Каталог `/news` и динамический маршрут `/news/:slug` (`/news/portal-update`) работают с загрузкой Markdown. |
| 5 | **Articles** | **PASS** | Каталог `/articles` и динамический маршрут `/articles/:slug` (`/articles/functional-ceramics-principles`) работают. |
| 6 | **Direct URL (SPA)** | **PASS** | Настроены rewrite-правила в `vercel.json` (`/((?!api/|admin/|uploads/|assets/|images/|robots\.txt|sitemap\.xml|favicon\.ico|favicon\.svg|config\.yml).*)` → `/index.html`). Прямой ввод любого URL отдаёт React SPA. |
| 7 | **/admin/** | **PASS** | Настроен 301 Permanent Redirect с `/admin` на `/admin/`. Панель Decap CMS и `config.yml` отдаются со статусом 200 OK без YAML-ошибок. |
| 8 | **GitHub OAuth** | **REQUIRES USER ACTION** | Serverless-функции `api/auth.js` и `api/callback.js` развёрнуты в коде. Требуется создать GitHub OAuth App и указать `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` в Vercel Dashboard. |
| 9 | **CMS Publish** | **REQUIRES USER ACTION** | Проведено локально в Этапе 4.1. В production выполняется после авторизации через GitHub OAuth. |
| 10 | **GitHub Commit** | **PASS** | Ветка `main` синхронизирована с GitHub `ruslatna-crypto/ks`. Flat-file контент сохраняется в Markdown. |
| 11 | **CMS Delete** | **REQUIRES USER ACTION** | Проведено локально в Этапе 4.1. В production выполняется после авторизации в CMS. |
| 12 | **Image Upload** | **REQUIRES USER ACTION** | Папка `public/uploads/` подготовлена и отслеживается Git. В production тест выполняется через CMS медиатеку. |
| 13 | **HTTPS** | **PASS** | Сертификат SSL/TLS автоматически генерируется Edge-сетью Vercel (Let's Encrypt) при развёртывании. |
| 14 | **robots.txt** | **PASS** | `dist/robots.txt` сформирован: `Allow: /`, `Disallow: /admin/`, `Disallow: /api/`, старый домен `infraks.ru` полностью удалён. |
| 15 | **sitemap.xml** | **PASS** | `dist/sitemap.xml` сформирован (40 страниц RU/EN с приоритетами, `changefreq` и `xhtml:link alternate`). Старый домен `infraks.ru` удалён. |
| 16 | **Canonical URLs** | **PASS** | Компонент `SEO.jsx` динамически рассчитывает и инжектирует `<link rel="canonical" href="...">` на всех страницах с адаптацией к production origin. |
| 17 | **RU/EN hreflang** | **PASS** | На всех страницах инжектируются валидные `<link rel="alternate" hreflang="ru">`, `hreflang="en"` и `hreflang="x-default"`. |
| 18 | **Open Graph** | **PASS** | Инжектируются `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `og:site_name`, `og:locale`. Для статей выставляется `type="article"`. |
| 19 | **Favicon** | **PASS** | Сгенерированы валидный `public/favicon.ico` (4286 байт) и векторный `public/favicon.svg` на базе оригинальной эмблемы керамического резонатора. |
| 20 | **Mobile 320px** | **PASS** | Адаптивная вёрстка без горизонтального скролла (`overflow-x: hidden`), сенсорное бургер-меню, масштабируемые карточки. |
| 21 | **Desktop 2560px** | **PASS** | Контейнер расширяется до 1540–1680px, таблицы занимают полную ширину, длина строки текста ограничена 1080px для комфортного чтения. |
| 22 | **Scientific content**| **PASS** | 7 разработок, 76 медицинских лекций, протоколы, формулы и архивные таблицы сохранены на 100% без изменений. |
| 23 | **Build verification**| **PASS** | `npm run build` отрабатывает без предупреждений и ошибок (1.87 с). |

---

## 3. Развёртывание на Vercel и SPA Routing

### Конфигурация `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "redirects": [
    {
      "source": "/admin",
      "destination": "/admin/",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/((?!api/|admin/|uploads/|assets/|images/|robots\\.txt|sitemap\\.xml|favicon\\.ico|favicon\\.svg|config\\.yml).*)",
      "destination": "/index.html"
    }
  ]
}
```

### Обработка маршрутов:
1. **`/admin` → `/admin/`**: серверный редирект HTTP 301 Permanent Redirect.
2. **`/admin/`**: статический файл `dist/admin/index.html` отдаётся напрямую, минуя React SPA.
3. **`/admin/config.yml`**: конфигурационный файл отдаётся напрямую.
4. **`/api/auth` и `/api/callback`**: автоматически маршрутизируются в Serverless Edge Functions `api/auth.js` и `api/callback.js`.
5. **Все остальные прямые URL** (`/news/:slug`, `/articles/:slug`, `/sushka`, `/metodika` и др.): направляются на `/index.html`, где React Router монтирует целевой компонент без 404 ошибки.

---

## 4. Vercel Environment Variables & GitHub OAuth

### Переменные окружения Vercel
Для работы серверной авторизации Decap CMS в Vercel Dashboard (**Settings → Environment Variables**) необходимо добавить:

```text
GITHUB_CLIENT_ID = <REQUIRES USER CONFIGURATION>
GITHUB_CLIENT_SECRET = <REQUIRES USER CONFIGURATION>
```

> **Политика безопасности:**
> * Секреты хранятся **исключительно** в зашифрованных Environment Variables Vercel.
> * Никакие секретные ключи не попадают в Git, React-бандл или публичные файлы `config.yml`.
> * Serverless-функции `api/auth.js` и `api/callback.js` выполняют обмен авторизационного кода на токен исключительно на стороне сервера.

---

## 5. Инструкция по настройке GitHub OAuth App

1. Перейдите в GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Заполните поля:
   * **Application name:** `KERAMIKA SINTEZ CMS`
   * **Homepage URL:** `https://ks-gray.vercel.app`
   * **Application description:** `Decap CMS GitHub Authentication for LLC KERAMIKA SINTEZ`
   * **Authorization callback URL:** `https://ks-gray.vercel.app/api/callback`
3. Нажмите **Register application**.
4. Скопируйте **Client ID** → вставьте в переменную `GITHUB_CLIENT_ID` на Vercel.
5. Нажмите **Generate a new client secret** → скопируйте **Client Secret** → вставьте в `GITHUB_CLIENT_SECRET` на Vercel.

---

## 6. Decap CMS: Динамическая инициализация

В `public/admin/index.html` внедрена динамическая инициализация через `window.CMS_MANUAL_INIT = true`:

```javascript
var hostname = window.location.hostname;
var isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'ks.loc';

CMS.init({
  config: {
    backend: {
      name: 'github',
      repo: 'ruslatna-crypto/ks',
      branch: 'main',
      base_url: window.location.origin,
      auth_endpoint: 'api/auth'
    },
    local_backend: isLocal,
    display_url: window.location.origin
  }
});
```

**Преимущества:**
* При локальной разработке (`localhost`, `ks.loc`) автоматически подключается `local_backend: true` (порт 8081).
* При развёртывании на Vercel (`*.vercel.app` или собственный домен) `base_url` автоматически принимает текущий origin `window.location.origin`, исключая хардкод локальных адресов.

---

## 7. SEO-оптимизация и метаданные

### 1. Компонент `SEO.jsx`
Создан легковесный компонент [src/components/SEO.jsx](file:///f:/laragon/www/ks.loc/src/components/SEO.jsx), интегрированный во все 11 ключевых страниц:
* **Динамический `<title>`**: уникальный для каждого раздела с суффиксом `| KERAMIKA SINTEZ`.
* **`<meta name="description">`**: строгие научно-технические описания без неподтверждённых маркетинговых фраз.
* **`<link rel="canonical">`**: точный URL страницы с адаптацией к production-домену.
* **`<link rel="alternate" hreflang="...">`**: двусторонние связки `ru`, `en` и `x-default`.
* **Open Graph**: `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`, `og:locale`.
* **Twitter Card**: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`.

### 2. Очистка от старого домена `infraks.ru`
* В `public/robots.txt` и `public/sitemap.xml` домен `infraks.ru` полностью заменён.
* Исторические ссылки внутри архивных JSON-структур (`orig_url`) сохранены для академической трассируемости первоисточников.

### 3. Фавикон
* Создан `public/favicon.svg` (векторный круглый резонатор в фирменных цветах `#3E4095`, `#ED3237`, `#201E1E`).
* Создан бинарный `public/favicon.ico` (32×32, 4286 байт) для обратной совместимости со старыми браузерами и поисковыми роботами.

---

## 8. Итоговый вердикт

# ЭТАП 5 — PASS WITH CONDITIONS

### Статус выполнения:
1. **Развёртывание на Vercel:** **ВЫПОЛНЕНО** — проект успешно подключён и активен по адресу: [`https://ks-gray.vercel.app`](https://ks-gray.vercel.app).
2. **Маршрутизация и SPA:** **ВЫПОЛНЕНО** — прямые URL, статические файлы и Serverless-функции работают без 404 ошибок.
3. **SEO-оптимизация:** **ВЫПОЛНЕНО** — `robots.txt`, `sitemap.xml`, Canonical, Open Graph и Favicon привязаны к production-домену `https://ks-gray.vercel.app`.
4. **Корректировка шапки:** **ВЫПОЛНЕНО** — лишний текст удалён, телефон оформлен текстом, социальные кнопки анимированы.
5. **Научный контент:** **СОХРАНЁН НА 100%** — 7 разработок, 76 лекций, протоколы и формулы без изменений.

### Что осталось сделать пользователю:

1. **Создать GitHub OAuth App в GitHub:**
   * Открыть: **Settings → Developer settings → OAuth Apps → New OAuth App**.
   * **Application name:** `KERAMIKA SINTEZ CMS`
   * **Homepage URL:** `https://ks-gray.vercel.app`
   * **Authorization callback URL:** `https://ks-gray.vercel.app/api/callback`
   * Нажать **Register application**.

2. **Добавить ключи в Vercel Dashboard:**
   * Открыть проект `ks` в Vercel → **Settings → Environment Variables**.
   * Добавить:
     * `GITHUB_CLIENT_ID` = *(Client ID из OAuth App)*
     * `GITHUB_CLIENT_SECRET` = *(Client Secret из OAuth App)*

3. **Контрольный вход в CMS и проверка публикации:**
   * Открыть `https://ks-gray.vercel.app/admin/`.
   * Нажать **Login with GitHub** и подтвердить доступ к репозиторию `ruslatna-crypto/ks`.
   * Создать временную новость: `PRODUCTION CMS TEST — DELETE ME` и нажать **Publish**.
   * Убедиться, что появился новый коммит в GitHub, Vercel выполнил деплой, и новость появилась на `https://ks-gray.vercel.app/news`.
   * Удалить тестовую новость через CMS.
