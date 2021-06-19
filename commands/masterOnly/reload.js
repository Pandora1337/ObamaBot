const fs = require('fs');
const logger = require('../../logger');

module.exports = {
    name: 'reload',
    description: 'Reloads a command, or loads a new one',
    usage: 'Type a name of a command to reload or load',
    aliases: 'r',
    args: true,
    masterOnly: true,
    execute(message, args) {

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
	        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        const commandFolders = fs.readdirSync('./commands'); // this is for subfolder search
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

        if (!command) {
            const commandNew = require(`../${folderName}/${commandName}.js`);
            message.client.commands.set(commandNew.name, commandNew);
            return message.channel.send(`Command \`${commandNew.name}\` was loaded!`);
        }
        
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded!`);
        }
         catch (error) {
            //console.error(error);
            logger.error(error)
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    }
}