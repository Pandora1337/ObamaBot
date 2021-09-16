const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { botId, TOKEN } = require('../../config.json');

module.exports = {
	name: 'update',
	description: 'updates slash commands!',
	aliases: ['u'],
	masterOnly: true,

	execute(interaction, args, client) {
		const guildId = interaction.guildId

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

			//if guildId is specified
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

		//standart behaviour
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