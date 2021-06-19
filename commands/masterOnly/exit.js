//const chalk = require('chalk');
const logger = require('../../logger');

module.exports = {
    name: 'exit',
    description: 'Obama gets shut down',
    usage: 'no dont pls',
    masterOnly: true,
    execute(message, client){
        logger.info('SHUTTING DOWN')
        //console.log(chalk.bgRed('SHUTTING DOWN'))
		process.exit()
     }
}