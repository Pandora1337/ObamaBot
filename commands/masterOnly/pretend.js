module.exports = {
    name: 'pretend',
    description: 'send msg as obama',
    aliases: ['msg'],
    usage: ' <@user> hello',
    example: 'hey Obama here',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    execute(message, args, client){
        //const filter = m => m.content.length > 0;

		const user = getUserFromMention(args[0]);
        message.delete()

        if (!user){
            message.channel.send(args.join(" "))
    }

		if (user) {
            const m = user.send(args.slice(1).join(' '))

            /*
            .then(m => {
                m.channel.awaitMessages(filter, { max: 50, time: 60000 * 1, errors: ['time'] })
                .then(collected => {
                    message.author.send(collected.join('\n'));
                })
                .catch(collected => {
                    message.author.send('------------------------------------');
                });
            })
            */
           
        }
        
        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                return client.users.cache.get(mention);
            }
        }
        
    }
}