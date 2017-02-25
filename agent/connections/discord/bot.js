const Discord = require('discord.js');
const logging = require("../../../modules/console.js")

const client = exports.client = new Discord.Client();
const config = exports.config = require('./discordConfig.json');

const commands = module.exports.commands = {};
const botPlugins = module.exports.botPlugins = [];

client.on('ready', () => {
    logging.info(`Discord bot successfully running on ${client.guilds.array().length} servers!`);
    logging.debug(`Running on the following servers: [${client.guilds.array()}}`);

});

client.on('reconnecting', () => {
    logging.info('Looks like the bot disconnected from discord... reconnecting');
});

client.on('disconnect', () => {
    logging.info('The discord bot has disconnected from discord completely!');
});

client.on('error', (err) => {
    logging.error(`The discord bot encountered an error, Error: ${err}`);
    logging.debug('Error stack trace: ' + err.stack);
})
