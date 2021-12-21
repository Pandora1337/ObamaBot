const { TOKEN } = require('./config.json');
const { ShardingManager } = require('discord.js');
const logger = require('../logger');

const manager = new ShardingManager('./bot.js', { token: `${TOKEN}`, totalShards: 'auto' });
manager.on('launch', shard => logger.server(`Launched shard ${shard.id}`));
manager.spawn();

//  manager.spawn({ amount: 'auto', delay: 5500, timeout: 30000 });