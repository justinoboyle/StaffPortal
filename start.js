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
      require("./database/driver.js")(config);
      
      // Set workers to listen for incoming connections  
      require("./server");
    }
} catch (err) {
    logging.crit("A critical error occured!", {error_name: err.name, error_message: err.message})
}