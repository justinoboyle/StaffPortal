const mongoose = require('mongoose')

const userSchema = require('./user')
const rolesSchema = require('./role')

module.exports = new mongoose.Schema({
  user: userSchema,
  roles: [rolesSchema],
  superAdmin: Boolean
})