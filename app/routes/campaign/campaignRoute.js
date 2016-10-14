const express = require('express')
const router = express.Router()
const CampaignLocal = require('../../CampaignLocal')
const errorAction = require('../../modules/helpers/errorAction')
const loadUser = require('../../modules/loadUser')


router.post('/', loadUser, (req, res) => {
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

    // TODO: На клиенте обработка массива ошибок для формы
    // errorDump.push({field: key, message: error.errors[key].message})
    return errorAction(error)
      .then(
        () => {
          let message = 'Кампания успешно добавлена'
          return res.json({
            success: true,
            message: message,
            campaign: campaign.toObject()
          })
        },
        errorDump => {
          res.status(422)
          return res.json({
            success: false,
            message: errorDump,
            campaign: campaign.toObject()
          })
        }
      )
  })
})

router.get('/', (req, res) => {
  let result = CampaignLocal.find().lean().exec((err, campaigns) => {
    res.json(campaigns)
  })
})

router.put('/', loadUser, (req, res) => {
  const id = req.body._id || false

  if(id) {
    CampaignLocal.findById(id, (err, campaign) => {
      if(err) {
        console.error('ERROR не найдена модель', err)
        
        // Если не передан идентификатор кампании
        res.status(422)
        return res.json({success: false, message: 'Не найдена кампания в бд'})
      }

      // Обновляем данные модели
      campaign.name = req.body.name
      campaign.desc = req.body.desc
      campaign.male = req.body.male
      campaign.price = req.body.price
      campaign.ageto = req.body.ageto
      campaign.image = req.body.image
      campaign.famale = req.body.famale
      campaign.approve = req.body.approve
      campaign.agefrom = req.body.agefrom
      campaign.category = req.body.category
      campaign.longdesc = req.body.longdesc
      campaign.landings = req.body.landings
      campaign.reccomment = req.body.reccomment
      campaign.calltimeto = req.body.calltimeto
      campaign.commissions = req.body.commissions
      campaign.calltimefrom = req.body.calltimefrom

      // Сохраняем модель
      campaign.save( error => {
        return errorAction(error)
          .then(
            () => {
              return res.json({success: true, message: 'Запрос обработан'})
            },
            errorDump => {
              res.status(422)
              return res.json({ success: false, message: errorDump})
            }
          )
      }) //save
    }) //findById
  } else {

    // Если не передан идентификатор кампании
    res.status(422)
    return res.json({success: false, message: 'Не передан id кампании'})
  }
})

module.exports = router
