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
    image: req.body.image,
    famale: req.body.famale,
    approve: req.body.approve,
    agefrom: req.body.agefrom,
    category: req.body.category,
    longdesc: req.body.longdesc,
    landings: req.body.landings,
    reccomment: req.body.reccomment,
    calltimeto: req.body.calltimeto,
    commissions: req.body.commissions,
    calltimefrom: req.body.calltimefrom,
  })

  console.log('Campaign add', req.body)

  campaign.save( error => {    
    if (error) {
      let errorDump = ''

      if(error.errors){
        for(var key in error.errors) {
          errorDump = `${error.errors[key].message}; ${errorDump}`

          // TODO: На клиенте обработка массива ошибок для формы
          // errorDump.push({field: key, message: error.errors[key].message})
        }
      } else {
        errorDump = error.message ? error.message : 'Непредвиденная ошибка'
      }

      console.error('Произошла ошибка во время сохранения', errorDump)

      res.status(422)
      return res.json({ success: false, message: errorDump })
    }

    return res.json({success: true, message: 'Кампания успешно добавлена'})
  })
})

router.get('/', (req, res) => {
  let result = CampaignLocal.find().lean().exec((err, campaigns) => {
    res.json(campaigns)
  })
})

module.exports = router
