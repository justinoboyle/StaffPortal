const mongoose = require('mongoose');

module.exports = {
  hash: {type: String, required: true, min: 8},
  salt: {type: String, required: true, length: 10},
  iterations: {type: Number, required: true}
}