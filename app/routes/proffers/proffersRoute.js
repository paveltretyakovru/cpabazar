const express = require('express')
const router = express.Router()
const Proffer = require('../../Proffer')
const errorAction = require('../../modules/helpers/errorAction')

router.get('/', (req, res) => {
  console.log('PROOOFERS!!!!')
  let result = Proffer.find().lean().exec((err, proffers) => {
    console.log('FETCH PROFFERS', proffers)
    res.json(proffers)
  })
})

module.exports = router
