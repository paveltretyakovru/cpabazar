const crypto = require('crypto-js/sha1')
const mongoose = require('mongoose')

const CampaignLocal = mongoose.Schema({
  desc: String,
  male: Boolean,
  price: Number,
  ageto: Number,
  famale: Boolean,
  approve: Number,
  agefrom: Number,
  category: String,
  longdesc: String,
  reccomment: String,
  calltimeto: Date,
  calltimefrom: Date,
  
  name: {
    type: String,
    unique: true,
    required: true,
  },
  lendings: [{
    url: String,
    title: String,
  }],
  commissions: [{
    price: Number,
    country: Number,
  }],
})

module.exports = mongoose.model('CampaignLocal', CampaignLocal)
