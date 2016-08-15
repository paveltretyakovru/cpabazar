'use strict';

let bookshelf = require('bookshelf');

const HOST = '178.62.26.249';
const USER = 'megaleadlan';
const CHARSET = 'utf8';
const PASSWORD = 'Mysql7Hell!';

let megaleadOptions = {
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: 'megalead',
  charset: CHARSET,
}

let megaleadAdminOptions = {
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: 'megalead_admin',
  charset: CHARSET,
}

let knexMegalead = require('knex')({
  client: 'mysql',
  connection: megaleadOptions,
});

let knexMegaleadAdmin = require('knex')({
  client: 'mysql',
  connection: megaleadAdminOptions,
});

module.exports = {
  megalead: bookshelf(knexMegalead),
  megaleadAdmin: bookshelf(knexMegaleadAdmin),
}
