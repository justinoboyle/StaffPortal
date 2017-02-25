const logging = require("./modules/console.js")
const os = require("os")
const cluster = require('cluster');
try {
  const server = require("./server/server.js")
  if (cluster.isMaster) {
    for (var I = 0; I < os.cpus().length; I++) {
      cluster.fork()
    }
  } else {
    
  }
}
catch(err) {
  logging.crit("A critical error occured!", {error_name: err.name, error_message: err.message})
}