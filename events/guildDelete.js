//const chalk = require('chalk');
const logger = require('../logger.js');
module.exports = {
	name: 'guildDelete',
	execute(guild){
		//console.log(chalk.magenta.bold(`[BOT LEAVES SERVER]`) + ` ${guild.name} (id: ${guild.id}).`);
		logger.server(`LEAVES ${guild.name} (id: ${guild.id}).`)
    }
}