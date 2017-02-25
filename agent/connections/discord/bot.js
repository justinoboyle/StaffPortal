exports.info = {
    name: 'Discord Bot',
    enabled: true
}

exports.runPlugin = function () {
    const Discord = require('discord.js');
    const logging = module.exports.logging = require("../../../modules/console.js")
    const fs = require("fs");
    const didYouMean = require('didyoumean');

    const client = exports.client = new Discord.Client();
    const config = exports.config = require('./discordConfig.json');

    let commands = module.exports.commands = {};
    let botPlugins = module.exports.botPlugins = [];

    let botMaintainers = module.exports.botMaintainers = ['182210823630880768']; //XeliteXirish
    let TESTING_PREFIX = '!!';

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

    client.on('warn', (warning) => {
        logging.warn('The discord bot has encountered a warning: ' + warning);
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

    client.on('guildCreate', (guild) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildCreate === 'function') {
                plugin.onGuildCreate(guild);
            }
        })
    });

    client.on('guildDelete', (guild) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildDelete === 'function') {
                plugin.onGuildDelete(guild);
            }
        })
    });

    client.on('guildMemberAdd', (guildMember) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildMemberAdd === 'function') {
                plugin.onGuildMemberAdd(guildMember);
            }
        })
    });

    client.on('guildMemberAvailable', (guildMember) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildMemberAvailable === 'function') {
                plugin.onGuildMemberAvailable(guildMember);
            }
        })
    });

    client.on('guildMemberRemove', (guildMember) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildMemberRemove === 'function') {
                plugin.onGuildMemberRemove(guildMember);
            }
        })
    });

    client.on('guildMemberRemove', (guildMember) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildMemberRemove === 'function') {
                plugin.onGuildMemberRemove(guildMember);
            }
        })
    });

    client.on('guildMemberSpeaking', (guildMember, speaking) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildMemberSpeaking === 'function') {
                plugin.onGuildMemberSpeaking(guildMember, speaking);
            }
        })
    });

    client.on('guildMemberUpdate', (oldMember, newMember) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildMemberUpdate === 'function') {
                plugin.onGuildMemberUpdate(oldMember, newMember);
            }
        })
    });

    client.on('guildUnavailable', (guild) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildUnavailable === 'function') {
                plugin.onGuildUnavailable(guild);
            }
        })
    });

    client.on('guildUpdate', (guild) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onGuildUpdate === 'function') {
                plugin.onGuildUpdate(guild);
            }
        })
    });

    client.on('message', (message) => {

        let cmd = message.content.split(' ')[0].substr(TESTING_PREFIX);
        let args = message.content.split(' ').splice(1);

        if (commands[cmd]) {
            try {
                commands[cmd].run(client, message, args);

            } catch (err) {
                logging.error(`Error performing command ${cmd}, Error: ${err}`);
                logging.debug(`Error stack trace: ${err.stack}`);
            }
        } else {
            let maybe = didYouMean(cmd, Object.keys(commands), {
                threshold: 5,
                thresholdType: 'edit-distance'
            });
            if (maybe) {
                message.reply(`:question: Did you mean \`${TESTING_PREFIX}${maybe}\`?`).then(m => m.delete(5000));
            }
        }

        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessage === 'function') {
                plugin.onMessage(message);
            }
        })
    });

    client.on('messageDelete', (message) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageDelete === 'function') {
                plugin.onMessageDelete(message);
            }
        })
    });

    client.on('messageDeleteBulk', (messages) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageDeleteBulk === 'function') {
                plugin.onMessageDeleteBulk(messages);
            }
        })
    });

    client.on('messageReactionAdd', (messageReaction, user) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageReactionAdd === 'function') {
                plugin.onMessageReactionAdd(messageReaction, user);
            }
        })
    });

    client.on('messageReactionAdd', (messageReaction, user) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageReactionAdd === 'function') {
                plugin.onMessageReactionAdd(messageReaction, user);
            }
        })
    });

    client.on('messageReactionRemove', (messageReaction, user) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageReactionRemove === 'function') {
                plugin.onMessageReactionRemove(messageReaction, user);
            }
        })
    });

    client.on('messageReactionRemoveAll', (messageReaction) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageReactionRemoveAll === 'function') {
                plugin.onMessageReactionRemoveAll(messageReaction);
            }
        })
    });

    client.on('messageReactionRemoveAll', (messageReaction) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageReactionRemoveAll === 'function') {
                plugin.onMessageReactionRemoveAll(messageReaction);
            }
        })
    });

    client.on('messageUpdate', (oldMessage, newMessage) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onMessageUpdate === 'function') {
                plugin.onMessageUpdate(oldMessage, newMessage);
            }
        })
    });

    client.on('presenceUpdate', (oldMember, newMember) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onPresenceUpdate === 'function') {
                plugin.onPresenceUpdate(oldMember, newMember);
            }
        })
    });

    client.on('roleCreate', (role) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onRoleCreate === 'function') {
                plugin.onRoleCreate(role);
            }
        })
    });

    client.on('roleDelete', (role) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onRoleDelete === 'function') {
                plugin.onRoleDelete(role);
            }
        })
    });

    client.on('roleUpdate', (oldRole, newRole) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onRoleUpdate === 'function') {
                plugin.onRoleUpdate(oldRole, newRole);
            }
        })
    });

    client.on('typingStart', (channel, user) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onTypingStart === 'function') {
                plugin.onTypingStart(channel, user);
            }
        })
    });

    client.on('typingStop', (channel, user) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onTypingStop === 'function') {
                plugin.onTypingStop(channel, user);
            }
        })
    });

    client.on('userNoteUpdate', (user, oldNote, newNote) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onUserNoteUpdate === 'function') {
                plugin.onUserNoteUpdate(user, oldNote, newNote);
            }
        })
    });

    client.on('userUpdate', (oldUser, newUser) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onUserUpdated === 'function') {
                plugin.onUserUpdated(oldUser, newUser);
            }
        })
    });

    client.on('voiceStateUpdate', (oldMember, newMember) => {
        botPlugins.forEach(plugin => {
            if (typeof plugin.onVoiceStateUpdated === 'function') {
                plugin.onVoiceStateUpdated(oldMember, newMember);
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
        });

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
}
