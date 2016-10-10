const express = require('express')
const router = express.Router()
const CampaignLocal = require('../../CampaignLocal')

router.post('/', (req, res) => {
  let campaign = new CampaignLocal({
    name: req.body.name,
    desc: req.body.desc,
    male: req.body.male,
    price: req.body.price,
    ageto: req.body.ageto,
    famale: req.body.famale,
    approve: req.body.approve,
    agefrom: req.body.agefrom,
    category: req.body.category,
    longdesc: req.body.longdesc,
    lendings: req.body.lendings,
    reccomment: req.body.reccomment,
    calltimeto: req.body.calltimeto,
    commissions: req.body.commissions,
    calltimefrom: req.body.calltimefrom,
  })

  console.log('Campaign add', req.body)

  campaign.save( error => {    
    if (error) {
      let errorDump = []

      for(var key in error.errors) {
        errorDump.push({
          field: key,
          message: error.errors[key].message,
        })
      }

      console.error('Произошла ошибка во время сохранения', errorDump)
      return res.json({ success: false, message: errorDump })
    }

    return res.json({success: true, message: 'Пользователь успешно добавлен'})
  })
})

module.exports = router
