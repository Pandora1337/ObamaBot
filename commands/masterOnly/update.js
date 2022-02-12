const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { botId } = require('../../config.json');
const { botToken } = require('../../bot.js')

module.exports = {
	name: 'update',
	description: 'updates slash commands!',
	aliases: ['u'],
	masterOnly: true,

	execute(interaction, args, client) {
		const guildId = interaction.guildId

		const slCommands = []

		client.commands.forEach(e => {
			if (e.masterOnly || e.nonInt == true) return // if command is owner-only or marked as non interaction

			if (e.data) { var eSon = e.data.toJSON() } // uses the SlashCommandBuilder data
			else {	// if no data builder, just makes it up. Example: ping command
				var eSon =
				{
					name: e.name,
					description: e.description,
					type: 1,
				}
			}

			if (e.type) { eSon.type = e.type; eSon.description = null } // if the type of the interaction is specified, overwrites data. Example: Animated Emoji
			slCommands.push(eSon)
		});

		const rest = new REST({ version: '9' }).setToken(botToken);
		

		// de-registering commands
		if (args == 'delete') {

			(async () => {
				try {
					await rest.put(
						Routes.applicationGuildCommands(botId, guildId),
						{ body: {} }
					);
					interaction.reply({ content: 'Successfully de-registered application commands.' })
					console.log('Successfully de-registered application commands.');
				} catch (error) {
					console.error(error);
				}
			})();
				return
			}

		// registering global commands
		if (args == 'global') {

		(async () => {
			try {
				await rest.put(
					Routes.applicationCommands(botId),
					{ body: slCommands },
				);
				interaction.reply({ content: 'Successfully registered global application commands.' })
				console.log('Successfully registered global application commands.');
			} catch (error) {
				console.error(error);
			}
		})();
			return
		}
			
		// de-registering global commands
		if (args == 'delete global') {

			(async () => {
				try {
					await rest.put(
						Routes.applicationCommands(botId),
						{ body: {} }
					);
					interaction.reply({ content: 'Successfully de-registered global application commands.' })
					console.log('Successfully de-registered global application commands.');
				} catch (error) {
					console.error(error);
				}
			})();
				return
			}


		//standard behaviour. registers commands in the current guild
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