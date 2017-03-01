const mongoose = require('mongoose')

const communityConfigSchema = require('./communityConfig')
const userSchema = require('./user')
const communityConnectionSchema = require('./communityConnection')

module.exports = new mongoose.Schema({
  id: {type: String, unique: true, required: true},
  date_created: {type: Date, required: true},
  config: communityConfigSchema,
  creator: userSchema,
  connections: [communityConnectionSchema]
})