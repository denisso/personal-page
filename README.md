[web site](https://mrdramm.netlify.app/)

## Начало работы

```bash
npm run dev
# or
yarn dev
```

Открываем в браузере [http://localhost:3000](http://localhost:3000)

Нужно подключить сервисы:
* mailgun для отправки почты
* contentful для хранения контента
* cloudinary для хранения madia 

Описание process.env переменных(настройки можно найти в панели управления):

* Переменные для contentful
  * CONTENTFUL_TOKEN - токен
  * SPACEID - space

* Переменные для маилган
  * MAILGUN_API_KEY - токен
  * MAILGUN_DOMAIN - имя нашего домена на маилган
  * MAILGUN_URL - адрес апи сервера малган
  * MAILGUN_FROM_EMAIL_ADDRESS - адрес с которого нам маилган отправляет письма
  * MAILGUN_CONTACT_TO_EMAIL_ADDRESS - адрес на котором получаем письма

* Переменные для cloudinary
  * IMAGECLOUDPREFIX в формате  https://res.cloudinary.com/[account name]/image/upload
