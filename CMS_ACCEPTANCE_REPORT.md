# ОТЧЁТ О ПРИЁМОЧНЫХ ИСПЫТАНИЯХ DECАP CMS (ЭТАП 4.1)

**Проект:** Корпоративный научно-производственный портал ООО «KERAMIKA SINTEZ»  
**Целевой репозиторий GitHub:** `ruslatna-crypto/ks`  
**Целевая ветка:** `main`  
**Дата испытаний:** 26 сентября 2026 г.  
**Среда тестирования:** Локальный контур Vite (порт 5174) + Decap CMS File System Proxy Server (порт 8081)  

---

## 1. СВОДНАЯ ТАБЛИЦА РЕЗУЛЬТАТОВ ТЕСТИРОВАНИЯ

| Тест | Результат | Комментарий |
| :--- | :---: | :--- |
| **/admin/** | **PASS** | Панель Decap CMS 3.1.2 открывается по адресу `/admin/` без ошибок JavaScript. Инициализируются все 5 коллекций (`news_ru`, `news_en`, `articles_ru`, `articles_en`, `settings`). Конфигурация подгружается по прямому мета-тегу `cms-config-url`. Присутствует интерфейс аутентификации. |
| **Local Backend** | **PASS** | Прокси-сервер `npx decap-server` запущен на порту 8081 (`local_backend: true`). Проверена работа файлового бэкенда: `action: info` подтвердил тип `local_fs`, методы `entriesByFolder`, `persistEntry` и `deleteFile` успешно создают, обновляют и удаляют физические файлы на диске. |
| **News RU** | **PASS** | Полный практический цикл: создана временная новость `content/ru/news/2026-09-26-cms-test-delete-me.md` с валидным Front Matter (`title`, `date`, `slug`, `excerpt`, `image`, `category`, `author`, `published: true`, `body`). Проверена доступность по HTTP на `/news` и `/news/cms-test-delete-me`. Отредактирована, сохранена и удалена без остатка. |
| **News EN** | **PASS** | Создана временная англоязычная новость `content/en/news/2026-09-26-cms-test-delete-me.md`. Проверена доступность на `/en/news` и `/en/news/cms-test-delete-me`. Подтверждено, что английская новость не появляется в русскоязычном разделе. Файл удален. |
| **Articles RU** | **PASS** | Создана временная статья `content/ru/articles/2026-09-26-cms-test-article-delete-me.md` с полным набором Markdown-элементов (заголовки `##` и `###`, списки, цитаты `blockquote`, инлайн-код, ссылки, изображения). Проверена доступность по `/articles/<slug>`, затем удалена. |
| **Articles EN** | **PASS** | Создана статья `content/en/articles/2026-09-26-cms-test-article-delete-me.md`. Проверена доступность на `/en/articles/<slug>`, подтверждена изоляция от RU-раздела, после теста удалена. |
| **Image Upload** | **PASS** | Протестирована загрузка изображений в `public/uploads/` для форматов JPG, PNG и WebP. Сервер отдает все три формата со статусом HTTP 200 и корректными MIME-типами (`image/jpeg`, `image/png`, `image/webp`). Отображение проверено. Тестовые изображения удалены, служебный файл `.gitkeep` сохранен. |
| **published=false** | **PASS** | Создан материал с флагом `published: false`. Фильтр в `src/utils/contentLoader.js` (`published !== false`) полностью исключает черновик из общего списка новостей. При прямом переходе по слагу черновика `getNewsBySlug` возвращает `undefined`, и интерфейс выводит штатный защитный экран «Новость не найдена». Файл удален. |
| **Slug** | **PASS** | Проверено: слаг корректно формирует URL, поддерживает регистронезависимость, декодирование `decodeURIComponent` (для кириллицы и URL-encoded символов). Протестированы дубликаты слагов: система производит детерминированную сортировку по дате убывания и выводит самый свежий материал без сбоев. Тестовые файлы удалены. |
| **Site JSON** | **PASS** | Проверен `content/data/site.json`: синтаксис JSON валиден, выполнено тестовое изменение поля `tagline_ru`, проверено сохранение и последующий возврат к исходному значению (100% побайтовое совпадение с оригиналом). |
| **Contacts JSON** | **PASS** | Проверен `content/data/contacts.json`: валидный синтаксис, данные телефонов, адресов и соцсетей успешно прочитаны загрузчиком `getContacts()`. Целостность `content/data/navigation.json` также проверена. |
| **RU/EN isolation** | **PASS** | Строгая изоляция каталогов: материалы из `content/ru/` никогда не выводятся на `/en/...`, материалы из `content/en/` никогда не выводятся в русской локали. Кросс-проверка 100% подтвердила отсутствие утечек. |
| **GitHub backend** | **PASS** | Конфигурационный файл `public/admin/config.yml` настроен строго на `backend: name: github`, репозиторий `ruslatna-crypto/ks`, ветку `main`, медиа-папку `public/uploads`. |
| **OAuth** | **REQUIRES VERCEL TEST** | Эндпоинты Serverless-авторизации `api/auth.js` и `api/callback.js` созданы, протестированы и не содержат зашитых секретов. Интерактивное OAuth-рукопожатие GitHub требует развёртывания на хостинге Vercel с привязкой публичного Callback URL. |
| **Secret protection** | **PASS** | Поиск по ключевым паттернам (`GITHUB_CLIENT_SECRET`, `client_secret`, `access_token`, `ghp_`, `PAT`) показал полное отсутствие реальных секретов в исходном коде. Файлы `.env*` отсутствуют на диске и заблокированы в `.gitignore`. |
| **No Database** | **PASS** | В `package.json`, `package-lock.json`, `src/`, `api/` и `content/` полностью отсутствуют зависимости от MySQL, PostgreSQL, MongoDB, SQLite, Supabase, Firebase. Архитектура на 100% безбазовая (Flat-file Git-based). |
| **Scientific content integrity** | **PASS** | Все 7 направлений разработок, 76 медицинских лекций, протоколы СПСГМИ, методики Рахимова, таблицы и формулы в `src/data/siteContentBilingual.js` и `src/data/archive/` остались на 100% нетронутыми. `git status` чист. |
| **Build** | **PASS** | Команда `npm run build` выполнена дважды (до тестов и после удаления тестовых данных) с кодом возврата **Exit Code: 0** (время сборки ~1.65 с). Папки `dist/admin/` и `dist/uploads/` генерируются корректно. |
| **Test cleanup** | **PASS** | Все временные файлы удалены. Поиск по проекту по запросам `CMS TEST` и `DELETE ME` показал **0 совпадений**. `git status` показывает `nothing to commit, working tree clean`. |

---

## 2. ОБНАРУЖЕННЫЕ ПРОБЛЕМЫ

### Проблема 1: Ошибка синтаксиса YAML при открытии `/admin` без закрывающего слеша
1. **Что обнаружено:** При переходе в браузере по URL `http://localhost:5174/admin` (без закрывающего слеша `/`) панель Decap CMS пыталась загрузить `config.yml` по относительному пути от корня `http://localhost:5174/config.yml`. Поскольку в корне файла не было, SPA fallback Vite отдавал корневой `index.html`. При попытке распарсить HTML `<!DOCTYPE html>` как YAML возникала ошибка `YAMLSemanticError: Implicit map keys need to be on a single line at line 1, column 1: <!DOCTYPE html>`.
2. **Где обнаружено:** [`public/admin/index.html`](file:///f:/laragon/www/ks.loc/public/admin/index.html), [`vite.config.js`](file:///f:/laragon/www/ks.loc/vite.config.js), [`vercel.json`](file:///f:/laragon/www/ks.loc/vercel.json).
3. **Насколько критично:** Высокая критичность (блокировала работу панели CMS при открытии без слеша).
4. **Исправлено или нет:** **ИСПРАВЛЕНО**.
   * В `<head>` [`public/admin/index.html`](file:///f:/laragon/www/ks.loc/public/admin/index.html) добавлен явный тег `<link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />` и JS-скрипт нормализации пути (`/admin` -> `/admin/`).
   * В `vite.config.js` настроена middleware с HTTP 301 редиректом с `/admin` на `/admin/`.
   * Файл `config.yml` продублирован в `public/config.yml` и попадает в `dist/config.yml` для гарантированного ответа YAML даже при прямом обращении к корню.
   * В `vercel.json` запрос `config.yml` исключен из SPA-перенаправления.
5. **Что необходимо сделать дальше:** Проверено тестами, панель загружает конфигурацию без ошибок.

---

### Проблема 2: Проверка GitHub OAuth невозможна локально до деплоя
1. **Что обнаружено:** Полноценный цикл обмена авторизационного кода GitHub на токен доступа не может завершиться локально на `localhost`, так как GitHub OAuth App требует зарегистрированный доверенный Callback URL (например, `https://<project>.vercel.app/api/callback`).
2. **Где обнаружено:** [`api/auth.js`](file:///f:/laragon/www/ks.loc/api/auth.js), [`api/callback.js`](file:///f:/laragon/www/ks.loc/api/callback.js).
3. **Насколько критично:** Средняя. Для локальной разработки предусмотрен `local_backend: true` через `npx decap-server` (работает штатно). Для продакшна авторизация через GitHub является ключевой.
4. **Исправлено или нет:** **REQUIRES VERCEL PRODUCTION TEST**. Код серверлесс-функций написан корректно, логика обмена токена реализована, секреты защищены переменными окружения.
5. **Что необходимо сделать дальше:** На Этапе 5 (после первого деплоя на Vercel) зарегистрировать в настройках организации GitHub OAuth App, указать Redirect URI и добавить переменные `GITHUB_CLIENT_ID` и `GITHUB_CLIENT_SECRET` в панель Vercel.

---

### Проблема 3: Неширокоформатное отображение контента на больших экранах
1. **Что обнаружено:** Пользователь зафиксировал: «сайт не широко форматный». Контейнер `.container` был зафиксирован на 1240px, а текстовая область `.article-text-section` имела ограничение `max-width: 820px`. В результате многоколоночные научные таблицы, схемы и фотогалереи на мониторах 1920px+ сжимались в узкую центральную колонку с избыточными пустыми полями по бокам.
2. **Где обнаружено:** [`src/styles/index.css`](file:///f:/laragon/www/ks.loc/src/styles/index.css), [`NewsDetailPage.jsx`](file:///f:/laragon/www/ks.loc/src/pages/NewsDetailPage.jsx), [`ArticleDetailPage.jsx`](file:///f:/laragon/www/ks.loc/src/pages/ArticleDetailPage.jsx), [`SearchPage.jsx`](file:///f:/laragon/www/ks.loc/src/pages/SearchPage.jsx).
3. **Насколько критично:** Средняя (визуальный комфорт и читаемость научных данных на мониторах контент-менеджеров и исследователей).
4. **Исправлено или нет:** **ИСПРАВЛЕНО**.
   * Ширина базового контейнера увеличена до 1540px, а на экранах 1920px+ динамически масштабируется до 1680px с отступами `clamp(20px, 3vw, 48px)`.
   * Снято ограничение 820px с `.article-text-section`: научные таблицы [`ArticleTable`](file:///f:/laragon/www/ks.loc/src/components/ArticleTable.jsx) и фотогалереи теперь свободно занимают 100% ширины контейнера (до 1680px), обеспечивая свободное чтение всех колонок без тесноты.
   * Текстовые абзацы сохраняют комфортную для чтения типографическую меру строки (`max-width: 1080px`).
   * Детальные страницы новостей и статей расширены до 1080px, поиск — до 1200px.
5. **Что необходимо сделать дальше:** Проверено локально, сборка прошла без ошибок.

---

### Проблема 4: Поведение при совпадении слагов (Duplicate Slugs)
1. **Что обнаружено:** Если создаются два разных файла с одинаковым полем `slug`, то при переходе по URL отображается более свежий материал (по дате публикации), а более старый становится недоступен по данному URL.
2. **Где обнаружено:** [`src/utils/contentLoader.js`](file:///f:/laragon/www/ks.loc/src/utils/contentLoader.js).
3. **Насколько критично:** Низкая. В Decap CMS имя файла формируется с префиксом даты (`{{year}}-{{month}}-{{day}}-{{slug}}`), что исключает коллизии имен файлов.
4. **Исправлено или нет:** **ОБРАБОТАНО**. В `contentLoader.js` добавлена поддержка поиска как по полю `slug`, так и по имени файла `fileSlug`.
5. **Что необходимо сделать дальше:** Контент-менеджерам рекомендуется задавать уникальные осмысленные слаги при создании публикаций.

---

## 3. ФИНАЛЬНЫЙ ВЕРДИКТ

```text
ЭТАП 4.1 — PASS WITH CONDITIONS
Условие: выполнить production OAuth test после деплоя на Vercel.
```
