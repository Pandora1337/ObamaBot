const logger = require('../logger.js');
module.exports = {
	name: 'guildCreate',
	execute(guild, client){
		logger.server(`JOINS ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
    }
}