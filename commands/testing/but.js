const disbut = require("discord-buttons");

module.exports = {
    name: 'but',
    description: 'buttons?!',
    aliases: [''],
    usage: '',
    example: '',
    args: false,
    guildOnly: false,
    permissions: '',
    masterOnly: true,
    execute(message, args, client){

    let button = new disbut.MessageButton()
        .setLabel("This is a button!")
        .setID("myid")
        .setStyle("blurple");


    let option = new disbut.MessageMenuOption()
        .setLabel('Your Label')
        .setEmoji('🍔')
        .setValue('menuid')
        .setDescription('Custom Description!')
        
    let select = new disbut.MessageMenu()
        .setID('customid')
        .setPlaceholder('Click me! :D')
        .setMaxValues(1)
        .setMinValues(1)
        .addOption(option)

        message.channel.send(`bruh`, button);

    }
}