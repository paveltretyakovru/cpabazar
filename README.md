# [Cpabazar](http://cpabazar.dailydiscount.ru/)
------------------------
Одностраничное приложение товаров, с административной панелью.
Отдельная MongoDB база данных, для полного редактирования параметров товара,
а так же их удаление и добавление

## Необоходимо пакеты перед развертыванием
Nodejs, compass, webpack, mongodb

## Используемые технологии и библиотеки
* ES6
* Scss
* React
* Redux
* Express
* MongoDB
* Webpack
* Mongoose
* Material-ui
* Flexboxgrid
* React-routing
* React-router-redux

## Установка

```bash
$ git clone git@gitlab.com:megalead/cpabazar.git
$ cd cpabazar
$ npm install
```

## Запуск

в [ ] - указаны занчения по-умолчанию

| Параметр    | Описание                                                 |
| ----------- | -------------------------------------------------------- |
| SERVER_HOST | host of express server, default 192.168.16.106 work ip   |
| FRONT_HOST  | host of public data, default 192.168.16.106:8080 work ip |
| PORT        | express server port, default 3002 port                   |

* Запуск сервера с прослушиванием порта PORT
```bash
$ PORT=3001 SERVER_HOST=ХОСТ_СЕРВЕРА npm run server
```

* Запус фронта в режиме разработки
```bash
$ [NODE_ENV=development SERVER_HOST=http://192.168.16.106:3001] npm run front
```

* Запуск сборки в каталог **./public**, файл **bundle.js**
```bash
$ [SERVER_HOST=megalead.ru:3001] npm run build
```

* Открыть в браузере: http://192.168.16.16:8080 если не указан сервер  для режима разработки
* Открыть в браузере: http://192.168.16.16:3000 для загрузки сайта с node сервера

На сервере megalead.ru этот проект запущен командой:

```bash
$ FRONT_HOST=http://cpabazar.dailydiscount.ru SERVER_HOST=178.62.26.249 nohup /usr/local/bin/npm --p refix /var/www/sftp/www/dailydiscount.ru/cpabazar run server > /dev/null 2>&1 &
```

> Это значит, что сервер запущен в фоновом режиме.
Так же в этой команде можно увидеть путь до проекта

Найти процесс можно командой:

```bash
$ ps aux | grep node
```
## Основные каталоги

| Каталог | Назначение                              |
| ------- | --------------------------------------- |
| app     | Исходники для nodejs-сервер приложения  |
| src     | Исходиники для frontend                 |
| public  | Содержит файлы для публикации           |

## Frontend
Фронт основан на React библиотеке [material-ui](http://material-ui.com)
Соответсвенно все приложение было написано с использование **React**.
Для управлением состоянием был выбран **Redux**

### Структура каталогов
В следсвии чего, структура каталогов является стандартным для Redux:

| Каталог        | Назначение                     |
| -------------- | ------------------------------ |
| src/actions    | Обработчики                    |
| src/reducers   | Редьюсеры                      |
| src/constants  | Константы                      |
| src/components | Компоненты                     |
| src/containers | Контейнеры (умные компоненты)  |

### Entry file
Входным файлом является ___src/index.js___

### Маршрутизация
__Маршрутизация__ организована с использованием __react-router__
и __react-router_redux__
Маршруты так же расположены в ___src/index.js___

### Стили
С помощью webpack созадан возможность импортирования стелей прямо в модули.
Сами стили написины с помощью препроцессора *Scss* и расположены в каталоге
___src/styles___

## Backend
Серверная часть развернута с помощью фреймворка __express__ с использованием
базы данных MongoDB и ORM Mongoose

### Структура каталогов
| Каталог     | Назначение                                        |
| ----------- | ------------------------------------------------- |
| app/modules | хелперы, конфиги, модули                          |
| app/routes  | выведенные в отдельные файлы, роутеры для express |

### Модели Mongoose
В каталоге ___app___, так же лежат *Mongoose* модели для работы с *mongodb*,
например ___app/User.js___ содержит модель пользователя

### Сессии
На сервере сессии организованы при помощи пакета [__express-session__](https://github.com/expressjs/session)
В куках храниться только ID

### Потдержка Cors
Для потдержки Cors запросов на сервере, был подклчен пакет
[__cors__](https://github.com/expressjs/cors/) и подключен к __express__
