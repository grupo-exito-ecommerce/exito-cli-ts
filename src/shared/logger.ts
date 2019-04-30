import winston from 'winston';
import moment from 'moment';
import chalk from 'chalk';
import path from 'path';

// create formatter for dates used as timestamps  HH:mm:ss.SSS
const tsFormat = () =>
  chalk.whiteBright(
    moment()
      .format('HH:mm')
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
      filename: path.join(__dirname, '../../ttracker.log'),
      timestamp: tsFormat, // makes timestamp 'pretty'
      json: true // makes log format just like console output
    })
  ]
});

// set logging level one of { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const VERBOSE = '--verbose';
const isVerbose = process.argv.indexOf(VERBOSE) >= 0;
if (isVerbose) {
  logger.level = 'debug';
}

export default logger;
