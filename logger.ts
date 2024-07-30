import winston from "winston";

const { combine, timestamp, label, printf, colorize, json, prettyPrint } =
  winston.format;

const myFormat = printf(({ level, message, label, timestamp, ...meta }) => {
  return `${timestamp} [${label}] ${level}: ${message} ${JSON.stringify(meta)}`;
});

const logger = winston.createLogger({
  level: "info", // Set the default log level
  format: combine(
    label({ label: "dockertest" }), // Add a label for your application
    timestamp(),
    json(),
    prettyPrint(),
  ),
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: combine(
        colorize(), // Apply colorization
        myFormat, // Apply the custom format
      ),
    }),
  ],
});

export default logger;
