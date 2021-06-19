const logger = require('../../logger');
module.exports = {
    name: 'server',
    description: 'server stats for the bot - non sharding',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    masterOnly: true,
    execute(message, args, client){
	
	memberCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    message.channel.send(`Server count: \`${client.guilds.cache.size}\`\nMember count: \`${memberCount}\``)
	
    }
}