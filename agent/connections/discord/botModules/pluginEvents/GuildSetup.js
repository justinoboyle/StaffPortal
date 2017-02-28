const logging = require("../../../../../modules/console.js");
const utils = require('./../utils');

exports.info = {
    name: 'Guild-Setup'
};

exports.onGuildCreate = function (guild) {
    if (!beenHereBefore(guild)) return;
    else logging.log(`Joined new guild ${guild.name}, starting setup now!`);

    exports.askToStart(guild);
};

/**
 * Exported so it can be called by a command if needed.  Asks to start the initialisation
 * @param guild
 */
exports.askToStart = function (guild) {
    guild.defaultChannel.sendMessage('To start the initialisation of the bot on the server, send the message ``start``').then(() => {
        guild.defaultChannel.awaitMessages(response => response.content === 'start', {
            max: 1,
            time: 60000,
            errors: ['time'],
        }).then((collected) => {
            startSetup(guild);

        }).catch(() => {
            guild.defaultChannel.sendMessage("You didn't reply within the time limit");
        })
    })
}

/**
 * Starts the bot initialisation
 * @param guild
 */
function startSetup(guild) {
    //TODO gota wait for the database to be done :(

}

/**
 * Checks if there is a previous config for this guild
 * @param guild
 * @returns {boolean}
 */
function beenHereBefore(guild) {
    // TODO check db if bot has a config
    return true;
}

/**
 * Check to see if its been initialised already
 * @param guild
 * @returns {boolean}
 */
function isInitialisedAlready(guild) {
    return true; //TODO check the db to see
}

function hasManageGuild(guild, message) {
    return utils.hasPermission(message, `MANAGE_GUILD`);
}