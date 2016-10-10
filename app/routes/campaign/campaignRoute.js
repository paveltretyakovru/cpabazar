const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  console.log('Post campaign route!', req.body)
  res.json({result: 'Success!'})
})

module.exports = router
