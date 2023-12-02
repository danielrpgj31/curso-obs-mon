const pino = require('pino');
const pretty = require('pino-pretty');

// Crie um logger com a formatação desejada

const transport = pino.transport({
    target: 'pino-pretty',
    options: { colorize: true, translateTime: 'yyyy-mm-dd HH:MM:ss.l' }
})
  
const logger = pino(transport)

function logMessage(msg) {
    logger.info(msg);
}

module.exports = {logMessage};