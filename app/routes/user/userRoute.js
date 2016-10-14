const express = require('express')
const router = express.Router()
const User = require('../../User')

router.post('/login', (req, res) => {

  console.log('Session ---->>>>', req.session)
  console.log('Cookies: --->>>>', req.cookies)

  const login = req.body.login || ''
  const password = req.body.password || ''

  const query = User.where({name: login})
  query.findOne((err, user) => {
    if (err) console.log('Error:', err)

    // Если пользователь найден
    if (user) {
      // Если логин и пароль верны
      if(user.authenticate(password)) {
        console.log('Successfull user login', user.id)
        req.session.user_id = user.id
        req.session.save()

        console.log('Session ---->>>>', req.session)
        console.log('Cookies: --->>>>', req.cookies)

        res.json({success: true, message: 'Авторизация успешно выполнена'})
      } else {
        console.log(`Unsuccessfull auth. Login: ${login}, pass: ${password}`)
        res.json({success: false, message: 'Неверные данные для вохда'})
      }
    } else {
      console.log(`Unsuccessfull auth. Login: ${login}, pass: ${password}`)
      res.json({success: false, message: 'Неверные данные для вохда'})
    }

  })
  // res.json({test: 'user router', body: req.body})
})

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(() => {
      return res.json({success: true, message: 'Успешный выход'})
    })
  } else {
    return res.json({success: true, message: 'Успешный выход'})
  }
})

module.exports = router
