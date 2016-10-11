const crypto = require('crypto-js/sha1')
const mongoose = require('mongoose')

const CampaignLocal = mongoose.Schema({
  desc: String,
  male: Boolean,
  image: String,
  price: Number,
  ageto: Number,
  famale: Boolean,
  approve: Number,
  agefrom: Number,
  category: String,
  longdesc: String,
  calltimeto: String,
  reccomment: String,
  calltimefrom: String,
  
  name: {
    type: String,
    unique: true,
    required: true,
  },
  landings: [{
    url: String,
    title: String,
  }],
  commissions: [{
    price: Number,
    country: String,
  }],
})

module.exports = mongoose.model('Campaign', CampaignLocal)
