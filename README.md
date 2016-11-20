# [Cpabazar](http://cpabazar.dailydiscount.ru/)
------------------------
Одностраничное приложение товаров, с административной панелью

## Установка
```
$ npm install
```

## Запуск
в [ ] - указаны занчения по-умолчанию

* Запуск сервера с прослушиванием порта PORT
``` $[PORT=3001 HOST=ТЕКУЩИЙ_IP] npm run server ```

* Запус фронта в режиме разработки
``` $ [NODE_ENV=development SERVER_HOST=http://192.168.16.106:3001]npm run front ```

* Запуск сборки в каталог **./public**, файл **bundle.js**
``` $ [SERVER_HOST=megalead.ru:3001] npm run build ```

* Открыть в браузере: http://192.168.16.16:8080 для режима разработки
* Открыть в браузере: http://192.168.16.16:3000 для загрузки сайта с node сервера

На сервере megalead.ru этот проект запущен командой -
$ FRONT_HOST=http://cpabazar.dailydiscount.ru SERVER_HOST=178.62.26.249 nohup /usr/local/bin/npm --p refix /var/www/sftp/www/dailydiscount.ru/cpabazar run server > /dev/null 2>&1 &
Это значит, что сервер запущен в фоновом режиме. Так же в этой команде можно увидеть путь до проекта
Процесс можно посмотреть коммандой $ ps aux | grep node
