const mongoose = require('mongoose')

const userSchema = require('./user')
const staffSchema = require('./staffMember')
const communitySchema = require('./community')

// The punishment document
module.exports = new mongoose.Schema({
  type: {type: String, required: true, enum: ["kick", "ban", "warn", "mute", "gag", "custom"]},
  custom: {type: String, required: false},
  admin: staffMember,
  reason: {type: String},
  date: {type: Date, required: true},
  info: {type: String},
  violator: userSchema,
  community: communitySchema
})