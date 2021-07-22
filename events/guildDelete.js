const logger = require('../logger.js');
module.exports = {
	name: 'guildDelete',
	execute(guild){
		logger.server(`LEAVES ${guild.name} (id: ${guild.id}).`)
    }
}