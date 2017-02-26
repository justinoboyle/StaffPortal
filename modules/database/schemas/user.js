const mongoose = require('mongoose')

const authSchema = require('./userAuth')
const userConfigSchema = require('./userConfig')
const punishmentSchema = require('./punishment')
const connectionSchema = require('./connection')

module.exports = new mongoose.Schema({
  auth: authSchema,
  config: userConfigSchema,
  id: {type: String, unique: true},
  date_created: {type: Date},
  punishments: punishmentSchema,
  connections: [connectionSchema]
})