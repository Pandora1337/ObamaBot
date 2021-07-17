const { prefix } = require('../../config.json');
const logger = require('../../logger.js');
const { MessageEmbed } = require('discord.js')
const { MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'help',
    description: `Lists all my commands with a cool new menu!`,
    aliases: ['h', 'list', 'commands'],
    emoji: '❓',
    usage: '<optional command name>',
    execute(message, args, client) {

        const { commands } = message.client;

        if (!args.length) {
            const files2 = commands.filter(command => command.masterOnly === false || !command.masterOnly)

            const files = commands.filter(command => command.masterOnly === false || !command.masterOnly)
                //.filter(command => authorPerms.has(command.permissions) || authorPerms)
                .map(command => `\`` + command.name + `\`` + ` - ` + command.description)

            const embed = new MessageEmbed()
<<<<<<< Updated upstream
                .setColor('#FFA500 ')
=======
                .setColor('#badf55')
>>>>>>> Stashed changes
                .setTitle('Here\'s a list of my commands:')
                .setDescription(`${files.join('\n\n')}`)
                .setThumbnail('https://image.cnbcfm.com/api/v1/image/104656161-GettyImages-688156110.jpg?v=1532563778')
                .setFooter(`btw, my prefix is ${prefix}`);
            //.setFooter(`You can send  ${prefix}help  [command name]  to get info on a specific command!`);

            var select = new MessageMenu()
                .setID('helpmenu')
                .setPlaceholder('Select a command for more info on it!')

            files2.forEach(c => {

                let option = new MessageMenuOption()
                    .setLabel(c.name)
                    .setValue(c.name)
                //.setDescription('YUH');
                if (c.emoji) { option.setEmoji(c.emoji) }
                //.setDescription(element.description);

                select.addOptions(option)

            });

            message.author.send(embed, select) //message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type !== 'dm') return message.reply('I\'ve sent you a DM with my commands!');
                })
                .catch(error => {
                    logger.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }


        client.on('clickMenu', async (menu) => {
            if (menu.id != 'helpmenu') return
            try {

                await menu.reply.send(getHelp(menu.values[0]))

            } catch (err) { }
        })

        if (args.length) {
            let data = []
            if (args[0] == 'master') {
                data.push(`Master-only commands: \n`)
                data.push(commands.filter(command => command.masterOnly === true)
                    .map(command => `\`` + command.name + `\`` + ` - ` + command.description).join('\n'));
                return message.author.send(data, { split: true })
            }

            const name = args[0].toLowerCase();

            if (!command) { return message.reply('That\'s not a valid command!') }

            return message.channel.send(getHelp(name))
        }

        function getHelp(name) {

            let data = []
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            var title = `**Name:** ${command.name}`;

            if (command.aliases) data.push(`**Short Name(s):** ${command.aliases.join(', ')}\n`);
            if (command.description) data.push(`**Description:** ${command.description}\n`);
            if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\`\n`);
            if (command.example) data.push(`**Example:** \`${prefix}${command.name} ${command.example}\`\n`);

            if (command.emoji) title = `**Name:** ${command.emoji} ${command.name}`

            const helpCommand = new MessageEmbed()
                .setColor('#ebc83d')
                .setTitle(`**Name:** ${command.emoji} ${command.name}`)
                .setDescription(data)

            return helpCommand
        }
    }
}