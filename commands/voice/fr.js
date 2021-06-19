module.exports = {
    name: 'fr',
    description: 'Plays an appropriate response if someone swears on God',
    aliases: ['forreal'],
    usage: '',
    example: '',
    args: false,
    guildOnly: true,
    masterOnly: false,
    async execute(message, args){
		message.delete()
		
        if (!message.member.voice.channel) return message.author.send('You need to be in a voice channel on the server!')

        let connection = await message.member.voice.channel.join();
        let dispatcher = await connection.play('./storage/audio/fr.m4a',{volume:0.5});
        dispatcher.on('start', () => connection.voice.setDeaf(true))
        dispatcher.on('finish', () => {
            connection.disconnect();
        })
    }
}