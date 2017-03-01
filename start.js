const logging = require("./modules/console.js");
const os = require("os");
const cluster = require('cluster');
const config = require('./config.json');
try {
    if (cluster.isMaster) {
        for (let I = 0; I < os.cpus().length; I++) {
            cluster.fork()
        }
    } else {
      // Connect to mongodb
      const db = require("./modules/database/driver.js")
      const result = db.connect(config);
      
      if (result === false) {
        // Restart worker by suicide
        cluster.worker.kill()
      }
      // Set workers to listen for incoming connections  
     // require("./server");
    }
} catch (err) {
    logging.crit("A critical error occured!", {err_name: err.name, err_message: err.message, err_stack: err.stack})
}