const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  platform: {type: String, required: true},
  config: {type: Object},
  authData: {type: Object}
})