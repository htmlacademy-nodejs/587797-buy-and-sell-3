'use strict';

const fs = require(`fs`);
const path = require(`path`);

const logsDirectory = path.resolve(__dirname, `logs/`);

let streams = [
  {level: `info`, stream: process.stdout},
  // {level: `error`, stream: process.stdout}
];
// let streams = [
//   {level: `info`, stream: fs.createWriteStream(`${logsDirectory}/app.txt`)},
//   {level: `error`, stream: fs.createWriteStream(`${logsDirectory}/errors.txt`)}
// ];

// if (process.env.NODE_ENV === `development`) {
//   streams = streams.concat([
//     {level: `info`, stream: process.stdout},
//     {level: `error`, stream: process.stderr}
//   ]);
// }

const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`,
  prettyPrint: true
}, require(`pino-multi-stream`).multistream(streams));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
