const Discord = require('discord.js');
const logging = require("../../../modules/console.js")
const fs = require("fs");

const client = exports.client = new Discord.Client();
const config = exports.config = require('./discordConfig.json');

let commands = module.exports.commands = {};
let botPlugins = module.exports.botPlugins = [];

client.on('ready', () => {
    logging.info(`Discord bot successfully running on ${client.guilds.array().length} servers!`);
    logging.debug(`Running on the following servers: [${client.guilds.array()}}`);

    loadCommandsAndPlugins();
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
});

client.on('channelCreate', (channel) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onChannelCreate === 'function') {
            plugin.onChannelCreate(channel);
        }
    })
});

client.on('channelDelete', (channel) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onChannelDelete === 'function') {
            plugin.onChannelDelete(channel);
        }
    })
});

client.on('channelPinsUpdate', (channel, time) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onChannelPinsUpdate === 'function') {
            plugin.onChannelPinsUpdate(channel, time);
        }
    })
});

client.on('channelUpdate', (oldChannel, newChannel) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onChannelUpdate === 'function') {
            plugin.onChannelUpdate(oldChannel, newChannel);
        }
    })
});

client.on('emojiCreate', (emoji) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onEmojiCreate === 'function') {
            plugin.onEmojiCreate(emoji);
        }
    })
});

client.on('emojiDelete', (emoji) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onEmojiDelete === 'function') {
            plugin.onEmojiDelete(emoji);
        }
    })
});

client.on('emojiUpdate', (oldEmoji, newEmoji) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onEmojiUpdate === 'function') {
            plugin.onEmojiUpdate(oldEmoji, newEmoji);
        }
    })
});

client.on('guildBanAdd', (guild, user) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onGuildBanAdd === 'function') {
            plugin.onGuildBanAdd(guild, user);
        }
    })
});

client.on('guildBanRemove', (guild, user) => {
    botPlugins.forEach(plugin => {
        if (typeof plugin.onGuildBanRemove === 'function') {
            plugin.onGuildBanRemove(guild, user);
        }
    })
});


/**
 * This function goes through all the files in the botModules folder and adds them to their respective arrays so they can be fired when required.
 */
function loadCommandsAndPlugins() {
    let pluginsCount = 0;
    botPlugins = []; // Empty's it so that if it is ran a second time we don't just add them again

    // Commands
    fs.readdirSync(__dirname + '/botModules/commands').forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;

        let command = require(`./botModules/commands/${file}`);
        if (typeof command.run !== 'function' || typeof command.info !== 'object' || typeof command.info.name !== 'string') {

            logging.info(`Invalid command file: ${file}`);
            return;
        }
        commands[command.info.name] = command;
        pluginsCount++;
    })

    // Plugins and events
    fs.readdirSync(__dirname + '/botModules/pluginEvents').forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;

        let plugin = require(`./botModules/pluginEvents/${file}`);
        if (typeof plugin.info !== 'object' || typeof plugin.info.name !== 'string') {

            console.error(`Invalid plugin file ${file}`);
            return;
        }
        botPlugins.push(plugin);
        pluginsCount++;
    });

    console.info(`Successfully loaded ${pluginsCount} plugins!`);
}

process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: \n" + err.stack);
});

client.login(config.botToken);
