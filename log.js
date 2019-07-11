const winston = require('winston')
const ramda = require('ramda')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'log.log' })]
})

module.exports = message =>
  logger.log({
    level: 'info',
    message
  })
