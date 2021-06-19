const { TOKEN } = require('./config.json');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: `${TOKEN}`, totalShards: 'auto' });
const logger = require('../logger');

//manager.on('launch', shard => console.log(chalk.magenta(`Launched shard ${shard.id}`)));
manager.on('launch', shard => logger.server(`Launched shard ${shard.id}`));
manager.spawn();