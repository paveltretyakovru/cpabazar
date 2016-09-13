const crypto = require('crypto-js/sha1')
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {type: String, required: true},
  password: {
    type: String,
    set: function(password) {
      this._password = password
      this.salt = this.makeSalt()
      this.hashed_password = this.encryptPassword(password)
      console.log('THIS hashed password', this.hashed_password)
      return this.hashed_password
    },
  },
})

UserSchema.methods.makeSalt = () => {
  return `${Math.round((new Date().valueOf() * Math.random()))}`
}

UserSchema.methods.encryptPassword = (password) => {
  return crypto(password, this.salt)
}

module.exports = mongoose.model('User', UserSchema)
