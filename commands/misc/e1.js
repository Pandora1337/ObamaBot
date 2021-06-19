const { User } = require("discord.js");

const argAlias = ['txt', 'text', 't', 'send', 's']
module.exports = {
    name: 'e1',
    description: `React with animated emojis! Also can send them in a message. \`<list>\` will show all the emoji names on the server.`,
    usage: `\`<text/list> [emoji name(s)]\`. \`<list> or leave blank\` to see all custom emojis. \`<${argAlias}>\` to send the emoji as a text`,
    example: `catjam peped`,
    aliases: [''],
    guildOnly: false,
    masterOnly: true,
    async execute(message, args, client){
        //var lastArg = parseInt(args.slice(args.length - 1).join(' ')); //last integer in args
        const channelID = message.channel.id

        if(args[0] === 'list' || !args.length){

            if (message.channel.type === 'dm') {
                var emojiList = `Below are all animated emojis available to me:\n\n` +
                    client.emojis.cache.filter(e => e.animated === true).map(e => e.toString()+' - '+e.name+`\n`).join("");
            } else {
                const guildName = message.guild.name
                var emojiList = `Below are the animated emojis from \`${guildName}\`! You can use these on any server with me in it!\n\n` +
                    message.guild.emojis.cache.filter(e => e.animated === true).map(e => e.toString()+' - '+e.name+`\n`).join("");
            }

            message.author.send(emojiList, { split: true });
            return message.delete()
        }
    }
}