const { ShardClientUtil } = require('discord.js');
const logger = require('../../logger');
module.exports = {
    name: 'stat',
    description: 'stats for the bot, except it doesnt work',
    aliases: ['stats'],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    masterOnly: true,
    execute(message, args, client){
        //message.channel.send(`${message.author.guilds.id}`)

        const promises = [
	        client.shard.fetchClientValues('guilds.cache.size'),
	        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

    Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalShards = ShardClientUtil.count
            return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}\nShard count: ${totalShards}`);
        })
        .catch(err)
            //console.error
            //logger.error(error)
    }
}