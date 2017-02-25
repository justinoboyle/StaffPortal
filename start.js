const logging = require("./modules/console.js") //Load in console agent
const os = require("os")
const cluster = require('cluster');
try {
  if (cluster.isMaster) {
    for (var I = 0; I < 4; I++) {
      cluster.fork()
    }
  } else {
    logging.warn("Warn everyone!", {hell: "here"})
  }
}
catch(err) {
  logging.crit("A critical error occured!", {error_name: err.name, error_message: err.message})
}