const { prefix } = require('../../config.json');
const logger = require('../../logger.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'oldhelp',
    description: 'Lists all my commands',
    masterOnly: true,
    execute(message, args) {

        const data = [];
        const { commands } = message.client;

        if (!args.length) {

            const files = commands.filter(command => command.masterOnly === false || !command.masterOnly)
                //.filter(command => authorPerms.has(command.permissions) || authorPerms)
                .map(command => `\`` + command.name + `\`` + ` - ` + command.description)

            const embed = new MessageEmbed()
                .setColor('#badf55 ')
                .setTitle('Here\'s a list of my commands:')
                .setDescription(`My prefix is \`${prefix}\`!\n\n${files.join('\n\n')}`)
                .setThumbnail('https://image.cnbcfm.com/api/v1/image/104656161-GettyImages-688156110.jpg?v=1532563778')
                .setFooter(`You can send  ${prefix}help  [command name]  to get info on a specific command!`);

            /*
            //const authorPerms = message.channel.permissionsFor(message.author);
            data.push(`My prefix is \`${prefix}\`\nHere\'s a list of available commands:\n`);
            data.push(files);
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            */

            return message.author.send(embed) //message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type !== 'dm') return message.reply('I\'ve sent you a DM with my commands!');
                })
                .catch(error => {
                    logger.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        if (args[0] == 'master') {
            data.push(`Master-only commands: \n`)
            data.push(commands.filter(command => command.masterOnly === true)
                .map(command => `\`` + command.name + `\`` + ` - ` + command.description).join('\n'));
            return message.author.send(data, { split: true })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) return message.reply('that\'s not a valid command!');

        data.push(`**Name:** ${command.name}\n`);

        if (command.aliases) data.push(`**Short Name(s):** ${command.aliases.join(', ')}\n`);
        if (command.description) data.push(`**Description:** ${command.description}\n`);
        if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\`\n`);
        if (command.example) data.push(`**Example:** \`${prefix}${command.name} ${command.example}\`\n`);

        const helpCommand = new MessageEmbed()
            .setColor('#ebc83d')
            .setTitle(`Extra info on \`${command.name}\``)
            .setDescription(data)

        message.channel.send(helpCommand);
    }
}