const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  res.json({test: 'user router'})
})

module.exports = router
