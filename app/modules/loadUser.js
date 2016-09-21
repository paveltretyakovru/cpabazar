const User = require('../../User')

function loadUser(req, res, next) {
  if (req.session.user_id) {
    User.findById(req.session.user_id, user => {
      if (user) {
        req.currentUser = user
        next()
      } else {
        res.redirect('/')
      }
    })
  } else {
    res.redirect('/')
  }
}

module.exports = loadUser
