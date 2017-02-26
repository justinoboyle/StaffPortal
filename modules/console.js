const winston = require("winston");
const mkdirp = require('mkdirp');
const colors = require('colors');
const cluster = require('cluster');
const os = require('os');
colors.enabled = true;
if (cluster.isWorker) {
  logger = {
    crit: (msg, data) => {
      tosend = {
        message: msg,
        data: data,
        level: "crit"
      }
      cluster.worker.send(tosend)
    },    
    err: (msg, data) => {
      tosend = {
        message: msg,
        data: data,
        level: "err"
      }
      cluster.worker.send(tosend)
    },
    warn: (msg, data) => {
      tosend = {
        message: msg,
        data: data,
        level: "warn"
      }
      cluster.worker.send(tosend)
    },
    info: (msg, data) => {
      tosend = {
        message: msg,
        data: data,
        level: "info"
      }
      cluster.worker.send(tosend)
    },
    log: (msg, data) => {
      tosend = {
        message: msg,
        data: data,
        level: "logging"
      }
      cluster.worker.send(tosend)
    },
    debug: (msg, data) => {
      tosend = {
        message: msg,
        data: data,
        level: "debug"
      }
      cluster.worker.send(tosend)
    },
    verbose: (msg, data) => {
      tosend = {
        message: msg,
        data: data,
        level: "verbose"
      }
      cluster.worker.send(tosend)
    }
  }
  module.exports = logger
  return;
}
mkdirp(__dirname + '/../logs', function(err) {
  if (err) {
    winston.error("A critical error has occured pre-boot. The staffportal instance failed to log the error to log files.\n"+err.name+"\n"+err.message+"\nStaffPortal can not continue boot.")
  }
})
const clevels = {
  levels: {
    crit: 0,
    err: 1,
    warn: 2,
    info: 3,
    logging: 4,
    debug: 5,
    verbose: 6
  },
  colors: {
    crit: "red",
    err: "red",
    warn: "yellow",
    info: "white",
    logging: "white",
    debug: "gray",
    verbose: "gray"
  }
}
var logging = new (winston.Logger)({
  exitOnError: false,
  colors: clevels.colors,
  levels: clevels.levels,
  transports: [
    new (winston.transports.Console)({
      name: "console",
      timestamp: () => {return new Date().toUTCString()},
      formatter: function(options) {
        var worker_id = options.meta.worker_id;
        delete options.meta.worker_id;
        if (options.level == "crit") {
          return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${"CRITICAL".bgRed})` + ` ${options.message ? options.message : "Unknown Critical Error Occured"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "").red}`+`\n\t\tStaffPortal can not continue and will shutdown.`).bold;
        } else {
          return `(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${options.level == "err" ? "ERROR".red : options.level.toUpperCase()[clevels.colors[options.level]]})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`.gray 
        }
      },
      colorize: true,
      level: "info"
    }),
    new (winston.transports.File)({
      name: "file-info",
      timestamp: () => {return new Date().toUTCString()},
      formatter: function(options) {
        var worker_id = options.meta.worker_id;
        delete options.meta.worker_id;
        if (options.level == "crit") {
          return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${"CRITICAL"})` + ` ${options.message ? options.message : "Unknown Critical Error Occured"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`+`\n\t\tStaffPortal can not continue and will shutdown.`);
        } else {
          return `(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${options.level == "err" ? "ERROR" : options.level.toUpperCase()})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}` 
        }
      },
      filename: __dirname+"/../logs/err-info.log",
      colorize: false,
      level: "info",
      maxsize: 10*1024*1024,
      tailable: true,
      json: false
    }),
    new (winston.transports.File)({
      name: "file-verbose",
      timestamp: () => {return new Date().toUTCString()},
      formatter: function(options) {
        var worker_id = options.meta.worker_id;
        delete options.meta.worker_id;
        if (options.level == "crit") {
          return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${"CRITICAL"})` + ` ${options.message ? options.message : "Unknown Critical Error Occured"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`+`\n\t\tStaffPortal can not continue and will shutdown.`);
        } else {
          return `(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${options.level == "err" ? "ERROR" : options.level.toUpperCase()})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}` 
        }
      },
      filename: __dirname+"/../logs/verbose.log",
      colorize: false,
      level: "verbose",
      maxsize: 10*1024*1024,
      tailable: true
    })
  ]
});
if (process.argv[2] == "DEBUG") {
  logging.add(
   new (winston.transports.File)({
     name: "file-exceptions",
      timestamp: () => {return new Date().toUTCString()},
      formatter: function(options) {
        var worker_id = options.meta.worker_id;
        delete options.meta.worker_id;
        if (options.level == "crit") {
          return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${"CRITICAL"})` + ` ${options.message ? options.message : "Unknown Critical Error Occured"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`+`\n\t\tStaffPortal can not continue and will shutdown.`);
        } else {
          return `(${options.timestamp()}) (Worker: ${worker_id ? worker_id : "master"}) (${options.level == "err" ? "ERROR" : options.level.toUpperCase()})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}` 
        }
      },
     filename: __dirname+"/../logs/exceptions.log",
     colorize: false,
     level: "crit",
     maxsize: 10*1024*1024,
     tailable: true,
     handleExceptions: true,
     humanReadableUnhandledException: true
   })
  )
}
logging.on('error', function (err) {
  logging.error("An error occured while attempting to log a message.", {err_n: err.name, err_m: err.message})
});
winston.addColors(clevels.colors);
if (cluster.isMaster) {
  worker_ui_ready = 0;
  worker_agent_ready = 0;
  cluster.on("message", (worker, msg, hande) => {
    if (!msg.type || msg.type == "log") {
      msg.data.worker_id = worker.id
      logging[msg.level](msg.message, msg.data);
      if (msg.level == "crit") {
        process.exit(1)
      }
    } else if (msg.type == "status") {
      switch(msg.subject) {
        case "web":
          if (msg.data == "ready") {
            worker_ui_ready++
            logging.logging("Worker interface is listening for incoming connections", {"worker_id":worker.id})
            if (worker_ui_ready == os.cpus().length) {
              logging.info("Web Interface started successfully");
            }
          } else if (msg.data == "error") {
            logging.warn("A worker has suffered an error while attempting to start the Web Interface. Worker has been restared.", {"worker_id":worker.id,"err_name":msg.err.name,"err_message":msg.err.message});
          } else {
            logging.logging("Worker sent unknown message data, message is ignored",{"worker_id":worker.id,"msg_data":msg.data})
          }
          break;
        case "agent":
          if (msg.data == "ready") {
            worker_agent_ready++
            logging.logging("Worker started Agent", {"worker_id":worker.id})
            if (worker_agent_ready == os.cpus().length) {
              logging.info("Third-Party Agent started successfully!")
            }
          } else if (msg.data == "error") {
            logging.warn("A worker has suffered an error while attempting to start the Web Interface. Worker has been restared.", {"worker_id":worker.id,"err_name":msg.err.name,"err_message":msg.err.message});
          } else {
            logging.logging("Worker sent unknown message data, message is ignored",{"worker_id":worker.id,"msg_data":msg.data})
          }
          break;
        case "db":
          if (msg.data == "ready") {
            worker_db_ready++
            logging.logging("Worker connected to DB")
            if (worker_db_ready == os.cpus().length) {
              logging.info("All workers are connected to MongoDB")
            }
          } else {
            logging.logging("Worker sent unknown message data, message is ignored",{"worker_id":worker.id,"msg_data":msg.data})
          }
          break;
        default:
          logging.logging("Worker sent unknown message subject, message is ignored",{"worker_id":worker.id,"msg_subject":msg.subject})
      }
    }
  })
}
module.exports = logging