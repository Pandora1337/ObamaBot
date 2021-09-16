const logger = require('../logger.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {

		if (interaction.isSelectMenu() && interaction.customId.includes('menu')) { // == 'emojimenu') {
			let commandComponent = interaction.customId.slice(0, -4)

			try {
				logger.exec(`?${commandComponent} ${interaction.values[0]}`)
				await interaction.client.commands.find(c => c.name == commandComponent).execute(interaction, [interaction.values[0]], interaction.client)

			} catch (error) { oops(error) }
		}


		const command = interaction.client.commands.get(interaction.commandName);

		if (!interaction.isCommand() && !interaction.isContextMenu()) return;

		try {
			logger.exec(`/${command.name}`);
			await command.execute(interaction, interaction.options, interaction.client);
			//await interaction.update()

		} catch (error) {
			oops(error)
			
		}

		async function oops(error) {
			await interaction.channel.send({ content: 'There was an error while executing this command!', ephemeral: true });
			console.error(error);
		}

	},
};