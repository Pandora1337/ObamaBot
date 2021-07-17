const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord-buttons');
module.exports = {
    name: 'but',
    description: 'button!',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    async execute(message, args, client) {

        let option = new MessageMenuOption()
            .setLabel('Your Label')
            //.setEmoji('🍔')
            .setValue('menuid')
            .setDescription('Custom Description!');

        let option2 = new MessageMenuOption()
            .setLabel('command2')
            .setValue('menuid2')
            .setDescription('another help thing');

        let select = new MessageMenu()
            .setID('customid')
            .setPlaceholder('Click me! :D')
            .addOptions(option, option2)
            .setMaxValues(1)
            .setMinValues(0);

        message.channel.send('Text with menu!', select);

        client.on('clickMenu', async (menu) => {
              if (menu.values[0] == 'menuid') {
                await menu.reply.send('bruv')
            } if (menu.values[0] == 'menuid2') {
                await menu.reply.send('lol hat')
            }
        })

    }
}