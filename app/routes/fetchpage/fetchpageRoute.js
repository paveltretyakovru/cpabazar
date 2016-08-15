'use strict';
var express = require('express');
var router = express.Router();
var Campaign = require('../../Campaign');

/* GET home page. */
router.get('/', (req, res) => {

  Campaign.fetchAll().then(campaigns => {
    campaigns.load(['pap']).then(campaigns => {
      res.json({campaigns: campaigns.toJSON()});
    });
  });
});

module.exports = router;
