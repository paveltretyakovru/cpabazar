'use strict';
const express = require('express')
const router = express.Router()
const postProfferLocal = require('./postProfferLocal')
const postProfferRemote = require('./postProfferRemote')

const postProfferType = 'local'

/* GET home page. */
router.post('/', (req, res) => {
  
  switch (postProfferType) {
    
    // Если предложения нужно сохранять в локльной mongodb
    case 'local':
      return postProfferLocal(req, res)
      break

    // Если предложения нужно отправлять на удаленный сервер megalead
    case 'remote':
      return postProfferType(req, res)
      break
    
    default:
      res.status(422)
      res.json({
        success: false,
        message: 'Произошла ошибка. Пожалуйста, попробуйте позже'
      })
      break
  }

})

module.exports = router
