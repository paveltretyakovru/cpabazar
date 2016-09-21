const express = require('express')
const router = express.Router()
const User = require('../../User')

router.get('/adduser', (req, res) => {
  let user = new User({name: 'ivan', password: 'Bazar7Hell!'})
  user.save()
  res.json(user)
})

module.exports = router
