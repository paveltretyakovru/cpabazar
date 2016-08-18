'use strict';
const express = require('express')
const router = express.Router()
const CommissionProffers = require('../../CommissionProffers')

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
}

/* GET home page. */
router.post('/', (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    skype: req.body.skype,
    message: req.body.message,
    proffercommission: req.body.proffercommission,
  }

  for (var prop in data) {
    addslashes(data[prop])
  }

  new CommissionProffers(data)
    .save()
    .then(model => {
      res.json(model.toJSON())
    })
})

module.exports = router
