const fs = require('fs');
const Discord = require('discord.js');
const { TOKEN, botId } = require('./config.json');
const logger = require('./logger.js')

const client = new Discord.Client();
require("discord-buttons")(client);

/*
//top.gg + DBL updates
const { AutoPoster } = require("topgg-autoposter");
const poster = new AutoPoster(topToken, client);

const DBL = require("./storage/DBLupdate.js")
const tbl = new DBL.get(dblToken) //process.env.dblToken

poster.on('posted', (stats) => { // ran when succesfully posted
    logger.info(`Posted stats to Top.gg | ${stats.serverCount} servers`)

    memberCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    tbl.post(client.guilds.cache.size, memberCount)
})
*/

//quizzes collection
client.quizes = new Discord.Collection();

const Folder = fs.readdirSync('./storage/quiz/')

for (const file of Folder) {
    if (file.endsWith('.js')) {
        const quiz = require(`./storage/quiz/${file}`);
        client.quizes.set(quiz.name, quiz);
    }
}

//events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}


//commands collection
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);

        //slashs commands
        /*
        if (!command.masterOnly) {
            client.api.applications(botId).guilds('406570311555874818').commands.post({
                data: {
                    name: command.name,
                    description: command.description
                }
            })
        }
        */
    }
}

/*
client.api.applications(botId).guilds('406570311555874818').commands.post({
    data: {
        name: 'pingity',
        description: 'ping pong!'
    }
})
client.ws.on('INTERACTION_CREATE', async interaction => {

    
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: 'hello world!'
            }
        }
    })

})
*/

client.login(TOKEN);