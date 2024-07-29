const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, label, printf, colorize, simple } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: combine(
    label({ label: 'dockertest' }), // Add a label for your application
    timestamp(),
    myFormat
  ),
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: combine(
        colorize(),
        simple()
      )
    }),

  ]
});

module.exports = logger;
