const express = require('express')
const router = express.Router()
const Proffer = require('../../Proffer')
const errorAction = require('../../modules/helpers/errorAction')

router.get('/', (req, res) => {
  Proffer.find().lean().exec((err, proffers) => {
    return res.json(proffers)
  })
})

router.delete('/', (req, res) => {
  const id = req.body.id || false

  if(id) {
    let proffer = Proffer.findById(id)
    proffer.remove(error => {
      errorAction(error)
        .then(
          () => {
            return res.json({
              success: true,
              message: `Предложение успешно удалено ${id}`
            })
          },

          (errorDump) => {
            res.status(422)
            return res.json({
              success: false,
              message: errorDump,
            })
          }
        )
    })
  } else {
    res.status(422)
    return res.json({
      success: false,
      message: 'Не передан идентификатор предложения',
    })
  }
})

module.exports = router
