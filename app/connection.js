const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/bazar')

exports.mongoose = mongoose
