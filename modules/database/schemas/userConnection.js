const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  platform: {type: String, required: true},
  userData: {type: Object},
  config: {type: Object}
})