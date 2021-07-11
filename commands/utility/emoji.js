const argAlias = ['txt', 'text', 't', 'send', 's']
const { prefix } = require('../../config.json')

module.exports = {
    name: 'emoji',
    description: `React with and send animated emojis! Also can send them in a message. No Nitro needed!`,
    usage: `<t/s> [emoji name(s)]\`. \`<list> or leave blank\` to see animated emojis. \`<${argAlias}>\` to send the emoji as a message.\\`,
    example: 's pepedance pepeclap',
    aliases: ['e', 'emojis', 'reaction', 'reactions'],
    guildOnly: true,
    async execute(message, args, client){
        //var lastArg = parseInt(args.slice(args.length - 1).join(' ')); //last integer in args

        if(args[0] === 'list' || !args.length){
            const guildName = message.guild.name
            var emojiMapping = message.guild.emojis.cache.filter(e => e.animated === true && e.available === true).map(e => e.toString()+' - '+e.name+`\n`).join("")
            if (!emojiMapping) {var emojiMapping = `Nothing here yet :(\n`}
            const emojiList = `Here are the available animated emojis from \`${guildName}\`:\n\n` +
                emojiMapping + `\nProper usage: \`${prefix}e <s/t> [emoji name(s)]\` \nYou can add more emojis by going to the Server Settings => Emoji => Upload Emoji and choose one that ends with \`.gif\`. You dont need Nitro for this!`;
            message.author.send(emojiList, { split: true });
            return message.delete()
        }
		
        if(args[0] === 'all'){
            //const guildName = message.guild.name
            const emojiList = `Here are all the available animated emojis:\n\n` +
                client.emojis.cache.filter(e => e.animated === true && e.available === true).map(e => e.toString()+' - '+e.name+`\n`).join("") +
				`\n\nYou can more by going to the Server Settings => Emoji => Upload Emoji and choose one that ends with \`.gif\`. You dont need Nitro for this!`;
            message.author.send(emojiList, { split: true });
            return message.delete()
        }

        const emojidata = [];

        message.channel.messages.fetch({limit: 2})
        .then(messageMappings => {
        let messages = Array.from(messageMappings.values());
        const previousMessage = messages[1];

        for (i = 0; i < 20; i++) { //(const emoji1 of args) //for all args, but alas the reaction limit is 20
            if(client.emojis.cache.some(e => e.name === args[i]) == false) continue
        
            const reactionEmoji = client.emojis.cache.find(e => e.name === args[i])

            if(argAlias.indexOf(args[0]) > -1){
                emojidata.push(reactionEmoji.toString())
            } else {
                previousMessage.react(reactionEmoji);
            }
        }
        }).then(array=> {
            if(argAlias.indexOf(args[0]) > -1){ 
                message.channel.send(emojidata.join(' '), {split: true})
            }})
            .then(message.delete({ timeout: 10 }))
            .catch()
        
        return //message.delete()
    }
}