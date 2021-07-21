const logger = require('../../logger');

module.exports = {
    name: 'exit',
    description: 'bot gets shut down',
    usage: ' ',
    masterOnly: true,
    execute(message, client){
        logger.info('SHUTTING DOWN')
        //console.log(chalk.bgRed('SHUTTING DOWN'))
		process.exit()
     }
}