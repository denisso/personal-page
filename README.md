# Сайт со статьями и личным опытом

Этот репозиторий содержит код для сайта, на котором публикуются статьи и описания личного опыта. Сайт доступен по [ссылке](https://mrdramm.vercel.app/).

## Подключенные сервисы

Для работы сайта используются следующие сервисы:

- **Mailgun** — для отправки электронной почты.
- **Contentful** — для хранения контента.
- **Cloudinary** — для хранения медиафайлов.

## Настройка переменных окружения (`process.env`)

Для корректной работы сайта необходимо настроить следующие переменные окружения. Настройки можно найти в панели управления соответствующих сервисов.

### Переменные для Contentful
- `CONTENTFUL_TOKEN` — токен доступа к Contentful.
- `SPACEID` — идентификатор пространства (space) в Contentful.

### Переменные для Mailgun
- `MAILGUN_API_KEY` — API-ключ для доступа к Mailgun.
- `MAILGUN_DOMAIN` — имя домена, зарегистрированного в Mailgun.
- `MAILGUN_URL` — URL API-сервера Mailgun.
- `MAILGUN_FROM_EMAIL_ADDRESS` — адрес электронной почты, с которого будут отправляться письма.
- `MAILGUN_CONTACT_TO_EMAIL_ADDRESS` — адрес электронной почты, на который будут приходить письма.

### Переменные для Cloudinary
- `IMAGECLOUDPREFIX` — префикс для доступа к медиафайлам в формате: `https://res.cloudinary.com/[account name]/image/upload`.

### Дополнительные переменные
- `SECURITY_TOKEN` — токен для доступа к API сервера.

## Начало работы

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Запустите проект в режиме разработки:

   ```bash
   npm run dev
   ```

3. Откройте сайт в браузере по адресу: [http://localhost:3000](http://localhost:3000).

---

Теперь ваш сайт готов к использованию! Если у вас возникнут вопросы, обратитесь к документации соответствующих сервисов или к настройкам в панели управления.
