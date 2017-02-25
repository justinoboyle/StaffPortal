const logging = require("./modules/console.js");
const os = require("os");
const cluster = require('cluster');

try {
    if (cluster.isMaster) {
        for (let I = 0; I < os.cpus().length; I++) {
            cluster.fork()
        }
    } else {
        require("./server");
        console.log('Process ' + process.pid + ' is listening to all incoming requests')
    }
} catch (err) {
    logging.crit("A critical error occured!", {error_name: err.name, error_message: err.message})
}