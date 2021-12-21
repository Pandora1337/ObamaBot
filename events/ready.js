const { ACTIVITY, ACTIVITY_TYPE, STATUS } = require('../config.json');
const logger = require('../logger');
const time = 1232460000; //jan 20th, 2009 at 17:00 utc

module.exports = {
        name: 'ready',
        once: true,
        async execute(client) {
                console.log('-------------------------------');
                logger.info(`Ready! Logged in as ${client.user.tag}`)
                console.log('-------------------------------');

                presence = client.user.setPresence({ activities: [{ name: ACTIVITY, type: ACTIVITY_TYPE }], status: STATUS });
                console.log(presence)
        },
};