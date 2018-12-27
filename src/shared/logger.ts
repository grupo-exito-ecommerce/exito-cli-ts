const winston = require("winston");
const moment = require("moment");
import chalk from "chalk";

// create formatter for dates used as timestamps
const tsFormat = () =>
  chalk.grey(
    moment()
      .format("HH:mm:ss.SSS")
      .trim()
  );

// define a logger with 2 transports - console and a file
const logger = new winston.Logger({
  transports: [
    // colorize the output to the console
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true
    }),
    new winston.transports.File({
      filename: "./ttracker.log",
      timestamp: tsFormat, // makes timestamp 'pretty'
      json: false // makes log format just like console output
    })
  ]
});

// set logging level one of { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const VERBOSE = "--verbose";
const isVerbose = process.argv.indexOf(VERBOSE) >= 0;
if (isVerbose) {
  logger.level = "debug";
}

export default logger;
