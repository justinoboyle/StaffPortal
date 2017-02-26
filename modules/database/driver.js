// Setting up
const mongoose = require('mongoose')
const findOrCreate = require("mongoose-findorcreate")
const cluster = require('cluster')
const logging = require('../console.js')
const userSchema = require('./schemas/user')
const communitySchema = require('./schemas/community')

module.exports = {
  connect: (config) => {
    // Connect to MongoDB
    mongoose.connect(config.db_url);
  
    var db = mongoose.connection;
    
    // When we encounter an error
    db.on('error', function(err) {
      logging.err("A worker suffered an error during connection to mongoDB!", {"worker_id": cluster.worker.id, "err_name": err.name, "err_message": err.message})
      logging.debug("Worker stack trace: ", {"stack": err.stack})
    })
  
    // Only once per worker
    db.once('open', function() {
      cluster.worker.send({
        type: "status",
        subject: "db",
        data: "ready"
      })
    })
    
    var Community = mongoose.model('Community', communitySchema)
    var User = mongoose.model('User', userSchema)
  },
  get: () => {
    
  },
  getConnection: () => {
    
  }
}