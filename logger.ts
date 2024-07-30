import winston from "winston";

const { format } = winston;
const { combine, timestamp, label, printf, colorize, simple } = format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

const logger = winston.createLogger({
  level: "info", // Set the default log level
  format: combine(
    format.json(),
    format.colorize({ all: true }),
    format.splat(),
  ),
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: colorize(),
    }),
  ],
});

export default logger;
