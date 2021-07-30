const logger = require('../logger.js');
module.exports = {
	name: 'guildCreate',
	execute(guild, client){
		logger.server(`JOINS new guild. This guild has ${guild.memberCount} members!`)
    }
}