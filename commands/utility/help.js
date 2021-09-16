const { prefix } = require('../../config.json');
const logger = require('../../logger.js');
const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'help',
    description: `Lists all my commands!`,
    aliases: ['h', 'list', 'commands'],
    emoji: '❔',
    usage: '<optional command name>',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Lists all my commands!`)
        .addStringOption(option => option.setName('command').setDescription('Command to get more info on')),

    async execute(message, args, client) {

        const { commands } = message.client;

        if (message.type == 'APPLICATION_COMMAND') {  //conversion between interaction and message syntax
            message.author = message.user
            if (message.options.getString('command')) { args[0] = message.options.getString('command'); }
        }


        if (args[0]) {
            let data = []
            if (args[0] == 'master') {
                data.push(`Master-only commands: \n`)
                data.push(commands.filter(command => command.masterOnly === true)
                    .map(command => `\`` + command.name + `\`` + ` - ` + command.description).join('\n'));
                return message.author.send({ content: data.toString() })
            }

            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.reply({ content: 'That\'s not a valid command!', ephemeral: true })
            }
            return message.reply({ embeds: [getHelp(name)], allowedMentions: { repliedUser: false }, ephemeral: true })
        }
        

        const files2 = commands.filter(command => command.masterOnly === false || !command.masterOnly)

        const files = commands.filter(command => command.masterOnly === false || !command.masterOnly)
            //.filter(command => authorPerms.has(command.permissions) || authorPerms)
            .map(command => {
                const map = ` \`${command.name}\` - ${command.description}`
                if (command.emoji) return command.emoji + map
                return map
            })

        var embedList = new MessageEmbed()
            .setColor('#FF7700 ')
            .setTitle('Here\'s a list of my commands:')
            .setDescription(`${files.join('\n\n')}`)
            .setThumbnail('https://image.cnbcfm.com/api/v1/image/104656161-GettyImages-688156110.jpg?v=1532563778')
            .setFooter(`btw, my prefix is ${prefix}`);
        //  .setFooter(`You can send  ${prefix}help  [command name]  to get info on a specific command!`);

        var select = new MessageSelectMenu()
            .setCustomId('helpmenu')
            .setPlaceholder('Select a command for more info on it!')

        files2.forEach(c => {
            select.addOptions([
                {
                    label: c.name,
                    value: c.name,
                    emoji: c.emoji,
                }
            ])
        });

        const row = new MessageActionRow()
            .addComponents(select)

        message.author.send({ embeds: [embedList], components: [row] }) //message.author.send(data, { split: true })

        if (message.channel.type !== 'DM') {
            message.reply({ content: 'I\'ve sent you a DM with my commands!', ephemeral: true })
                .catch(error => {
                    logger.error(`Could not send help DM.\n`, error);
                    message.reply({ content: 'It seems like I can\'t DM you! Do you have DMs disabled?', ephemeral: true });
                });
        }


        /*
        var collector = await msg.createMessageComponentCollector({ componentType: 'SELECT_MENU', idle: 60000 * 10, errors: ['time'] })

        collector.on('collect', async (menu) => {
            await menu.reply({ embeds: [getHelp(menu.values[0])] })
        });

        collector.on('end', (menu, reason) => {
            if (reason != 'idle') return
            msg.edit({ embeds: [embedList], components: [] })
        })
        */

        function getHelp(name) {

            let data = []
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            data.push(`**Name:** ${command.name}\n`)

            if (command.aliases) data.push(`**Short Name(s):** ${command.aliases.join(', ')}\n`);
            if (command.description) data.push(`**Description:** ${command.description}\n`);
            if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\`\n`);
            if (command.usageInt) data.push(`**Usage:** ${command.usageInt}\n`);
            if (command.example) data.push(`**Example:** \`${prefix}${command.name} ${command.example}\`\n`);

            const helpCommand = new MessageEmbed()
                .setColor('#ebc83d')
                .setDescription(data.join("\n").toString())
                .setTitle(`< ${command.name} >`);
            if (command.emoji) { helpCommand.setTitle(`< ${command.emoji} ${command.name} >`) }

            return helpCommand
        }
    }
}