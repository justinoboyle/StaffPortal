const mongoose = require('mongoose')

const permissionSchema = require('./permission')

module.exports = new mongoose.Schema({
  permissions: [permissionSchema],
  name: {type: String, required: true},
  color: {type: String},
  id: {type: String, unique: true, required: true}
})