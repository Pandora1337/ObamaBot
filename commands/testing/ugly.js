module.exports = {
    name: 'ugly',
    description: 'damn',
    aliases: '',
    usage: '',
    example: '',
    args: false,
    guildOnly: true,
    masterOnly: true,
    async execute(message, args){

        message.delete();

        if (message.guild.channels.cache.some(c => c.name == `${args.join(' ')}`)){// || !message.member.voice.channel){
            const target = message.guild.channels.cache.find(c => c.name == `${args.join(' ')}`)
            var connection = await target.join();
        } else if (message.member.voice.channel) {
            var connection = await message.member.voice.channel.join();
        } else {
            message.author.send('You need to be in a voice channel on the server OR type voice channel name!\n\nAvailable arguments:\nwind\nrain\ngwent1-6\ndead\nhmm\nfilth')
        return
        }


        if (args[0]== 'wind'){
            let dispatcher = await connection.play('./storage/audio/wind.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
        dispatcher.on('finish', () => {
            connection.disconnect();
        })
        return
        } if (args[0]== 'rain'){
            let dispatcher = await connection.play('./storage/audio/rain.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        } if (args[0]== 'gwent1'){
            let dispatcher = await connection.play('./storage/audio/gwent1.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        } if (args[0]== 'gwent2'){
            let dispatcher = await connection.play('./storage/audio/gwent2.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        } if (args[0]== 'gwent3'){
            let dispatcher = await connection.play('./storage/audio/gwent3.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        } if (args[0]== 'gwent4'){
            let dispatcher = await connection.play('./storage/audio/gwent4.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        } if (args[0]== 'gwent5'){
            let dispatcher = await connection.play('./storage/audio/gwent5.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        } if (args[0]== 'gwent6'){
            let dispatcher = await connection.play('./storage/audio/gwent6.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        }if (args[0]== 'dead'){
            let dispatcher = await connection.play('./storage/audio/dead.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        }if (args[0]== 'hmm'){
            let dispatcher = await connection.play('./storage/audio/hmm.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        }
        if (args[0]== 'filth'){
            let dispatcher = await connection.play('./storage/audio/filth.ogg',{volume:0.5});
            dispatcher.on(`start`, () => connection.voice.setDeaf(true))
            dispatcher.on('finish', () => {
                connection.disconnect();
            })
            return
        }else{
        let dispatcher = await connection.play('./storage/audio/ugly.ogg',{volume:0.5});
        dispatcher.on(`start`, () => connection.voice.setDeaf(true))
        dispatcher.on('finish', () => {
            connection.disconnect();
        })
        return
        }
    }
}