const { split } = require("ffmpeg-static");

module.exports = {
    name: 'ugly1',
    description: 'damn',
    aliases: '',
    usage: '',
    example: '',
    args: false,
    guildOnly: true,
    masterOnly: true,
    async execute(message, args, client){

        message.delete();

        // if (message.member.voice.channel)
        if (!message.content.includes('-') && !message.member.voice.channel) return message.author.send('You need to be in a voice channel on the server OR do \`-[voice channel name]\`')
            
        const splitArg = args.split("-");

        const target = message.guild.channels.cache.find(c => c.name == `${splitArg[1].join(' ')}`);
        const audio = client.find(e => e.name === splitArg[0]);
        var connection = await target.join();
        let dispatcher = await connection.play(`./storage/audio/${audio}.ogg`,{volume:0.5});

        

        dispatcher.on('finish', () => {
            connection.disconnect();
        })
    }
}