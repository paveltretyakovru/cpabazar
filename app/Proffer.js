const mongoose = require('mongoose')

const Proffer = mongoose.Schema({
  name: String,
  email: String,
  skype: String,
  message: String,
  campaign: String,
  proffercommission: Number,
})

module.exports = mongoose.model('Proffer', Proffer)
