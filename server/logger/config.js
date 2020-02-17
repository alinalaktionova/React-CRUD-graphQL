const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "server/logger/exception.log",
      level: "error"
    })
  ],
  exitOnError: false
});

module.exports = logger;
