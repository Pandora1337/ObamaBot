const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { botId, TOKEN } = require('../../config.json');
const guildId = '406570311555874818' //'613364808279916544' //

module.exports = {
	name: 'update',
	description: 'updates slash commands!',
	aliases: ['u'],
	masterOnly: true,

	execute(interaction, args, client) {

		const slCommands = []

		client.commands.forEach(e => {
			if (e.masterOnly || e.nonInt == true) return

			if (e.data) { var eSon = e.data.toJSON() }
			else {
				var eSon =
				{
					name: e.name,
					description: e.description,
					type: 1,
				}
			}

			if (e.type) { eSon.type = e.type; eSon.description = null }
			slCommands.push(eSon)
		});

		const rest = new REST({ version: '9' }).setToken(TOKEN);

		if (args == 'global') {

		(async () => {
			try {
				await rest.put(
					Routes.applicationCommands(botId),
					{ body: slCommands },
				);
				interaction.reply({ content: 'Successfully registered application commands.' })
				console.log('Successfully registered global application commands.');
			} catch (error) {
				console.error(error);
			}
		})();
			return
		}

		if (!isNaN(args) && args.length) {

		(async () => {
			try {
				await rest.put(
					Routes.applicationGuildCommands(botId, args),
					{ body: slCommands },
				);
				interaction.reply({ content: `Successfully registered application commands in ${args}` })
				//console.log('Successfully registered guild application commands.');
			} catch (error) {
				console.error(error);
			}
		})();
			return
		}

		(async () => {
			try {
				await rest.put(
					Routes.applicationGuildCommands(botId, guildId),
					{ body: slCommands },
				);
				interaction.reply({ content: 'Successfully registered application commands.', ephemeral: true })
				console.log('Successfully registered application commands.');
			} catch (error) {
				console.error(error);
			}
		})();

	}
}