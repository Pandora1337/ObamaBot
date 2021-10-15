const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'say',
    description: 'Send messages as Obama! A non-slash command',
    aliases: ['s', 'msg', 'm'],
    emoji: '📨',
    example: 'hey Obama here',
    args: true,
    guildOnly: true,
    permissions: '',
    masterOnly: false,
    nonInt: true, //disabled
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Send messages as Obama')
		.addStringOption(option => option.setName('message').setDescription('Message to send as Obama in the current channel').setRequired(true)),

    execute(message, args, client){

		if (message.type == 'APPLICATION_COMMAND') { //doesnt work, / disabled
			content = message.options.getString('message');
            message.reply({ content: content, ephemeral: false, allowedMentions: { repliedUser: false }})

        } else { 
            message.delete()
            var content = args.join(" ")
            message.channel.send( content )
        }
    }
        
        /*
		const user = getUserFromMention(args[0]);
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
        */
}