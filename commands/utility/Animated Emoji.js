const { MessageSelectMenu, MessageActionRow, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'Animated Emoji',
    description: `React with animated emoji through a context menu!`,
    aliases: ['animated emoji'],
    usageInt: 'Right click a message and select \`Apps\` => \`Animated Emoji\`',
    emoji: '<a:wobble:830931821704642621>',
    masterOnly: false,
    type: '3',

    async execute(message) {

        if (message.targetId) return getMenu(message)
        else if (message.type == 'MESSAGE_COMPONENT') eReact(message, message.values[0])
        else return console.log('bruvisimo')

        async function getMenu(message) {

            const emojimenu = new MessageSelectMenu()
                .setCustomId('Animated Emojimenu')
                .setPlaceholder('Select an emoji to react with!');
            //.setMaxValues(1);

            const embed = new MessageEmbed()
                .setColor('#9423E1')
                .setTitle('Animated Emoji Selector')
                .setDescription('You can click the menu multiple times!')
                //.setThumbnail('http://icons.iconarchive.com/icons/iconsmind/outline/512/Hipster-Headphones-icon.png')
                .setFooter({ text: `Add more .gif emojis through server settings! No Nitro needed!` });

            if (message.guild.me.displayHexColor != '#000000') { embed.setColor(message.guild.me.displayHexColor) }

            var guildEmojis = await message.guild.emojis.fetch()

            if (!guildEmojis.some(e => e.animated == true && e.available === true)) {
                return message.reply({ embeds: [embed.setDescription('There are no animated emojis available on this server :(')], ephemeral: true })
            }

            var emojiMapping = guildEmojis.filter(e => e.animated === true && e.available === true)

            emojiMapping.forEach(c => {
                emojimenu.addOptions([
                    {
                        label: c.name,
                        value: `${c.toString()}.${message.targetId}`,
                        emoji: c.toString(),
                    }
                ])
            });

            const row = new MessageActionRow()
                .addComponents(emojimenu)

            message.reply({ embeds: [embed], components: [row], ephemeral: true })
        }


        function eReact(int, value) {
            let fileComponents = value.split('.');

            let emoji = fileComponents[0];
            let target = fileComponents[1];

            int.channel.messages.fetch(target)
                .then(async mes =>  {
                    await int.deferUpdate()
                    mes.react(emoji)
                        .catch(error => { int.followUp({ content: 'Error while reacting!\nIs the message deleted, or are there too many emojis?', ephemeral: true }) })
                })
        }
    }
}