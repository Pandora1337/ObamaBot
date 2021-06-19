//const chalk = require('chalk');
const logger = require('../logger.js');
module.exports = {
	name: 'guildCreate',
	execute(guild){
		//console.log(chalk.magenta.bold(`[BOT JOINS SERVER]`) + ` ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
		logger.server(`JOINS ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
    }
}