const mongoose = require('mongoose')

const staffMemberSchema = require('./staffMember')
const roleSchema = require('./role')

module.exports = new mongoose.Schema({
  name: {type: String, required: true},
  staff: [staffMemberSchema],
  avatar: {type: Buffer},
  roles: [roleSchema]
})