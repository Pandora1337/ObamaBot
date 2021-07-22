const {ACTIVITY, ACTIVITY_TYPE, STATUS} = require('../config.json');
const logger = require('../logger');
const time = 1232460000; //jan 20th, 2009 at 17:00 utc
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
                console.log('-------------------------------');
                logger.info(`Ready! Logged in as ${client.user.tag}`)
                console.log('-------------------------------');

                client.user.setPresence({ activity: { name: ACTIVITY, type: ACTIVITY_TYPE }, status: STATUS })
                //client.user.setAvatar('https://media1.tenor.com/images/82a9076fd2d9b1a574cb239750b1491e/tenor.gif?itemid=5118627')
                        .then(console.log)
                        .catch(console.error);
	},
};