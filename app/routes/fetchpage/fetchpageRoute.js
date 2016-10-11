'use strict';
const express = require('express');
const router = express.Router();
const remoteFetch = require('./remoteFetch')
const localFetch = require('./localFetch')

const fetchType = 'local'

/* GET home page. */
router.get('/', (req, res) => {
  if(fetchType === 'local') {
    return localFetch(req, res)
  } else {
    return remoteFetch(req, res)
  }
});

module.exports = router;
