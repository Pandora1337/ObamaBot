const { SlashCommandBuilder } = require('@discordjs/builders');

const name = 'say'
const desc = 'Send messages as Obama!'

module.exports = {
    name: name, description: desc,
    aliases: ['s', 'msg', 'm'],
    emoji: '📨',
    example: 'hey Obama here',
    args: true,
    guildOnly: true,
    permissions: '',
    masterOnly: false,
    nonInt: true, //disabled due to bot 'replying' to the invoker
	data: new SlashCommandBuilder()
		.setName(name)
		.setDescription(desc)
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