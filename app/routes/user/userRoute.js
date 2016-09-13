const express = require('express')
const router = express.Router()
const User = require('../../User')

router.post('/login', (req, res) => {
  res.json({test: 'user router'})
})

router.get('/adduser', (req, res) => {
  let user = new User({
    name: 'ПашкоGoga',
    password: 'mytest :)',
  })
  user.save()
  res.json(user.password)
})

module.exports = router
