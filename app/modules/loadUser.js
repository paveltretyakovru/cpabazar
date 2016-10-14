const User = require('../User')

function loadUser(req, res, next) {
  if (req.session.user_id) {
    User.findById(req.session.user_id, error => {
      if (!error) {
        req.currentUser = User
        next()
      } else {
        res.status(302)
        res.json({success: false, message: 'Недостаточно привелегий'})
      }
    })
  } else {
    res.status(302)
    res.json({success: false, message: 'Недостаточно привелегий'})
  }
}

module.exports = loadUser
