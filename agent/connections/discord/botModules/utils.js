const bot = require('./../bot');
const logging = require("../../../../modules/console.js");

const RichEmbed = require('discord.js').RichEmbed;

/**
 * Returns a simple embed with default username
 * @param title
 * @param text
 * @param colour
 * @param isBad
 * @returns {RichEmbed|"discord.js".RichEmbed}
 */
exports.getSimpleEmbed = function (title, text, colour, isBad = false) {

    let embedMsg = new RichEmbed()
        .setTitle(title)
        .setAuthor("Staff Portal", bot.client.user.avatarURL)
        .setColor(colour)
        .setURL('https://github.com/TCDG/StaffPortal')
        .setDescription(text);
    if (isBad) embedMsg.setThumbnail("https://www.shaunoneill.com/assets/genericError.png");

    return embedMsg;
};

/**
 * Checks to see if a users highest role is higher then another users.
 * @param authorMember
 * @param mentionedMember
 * @returns {boolean}
 */
exports.checkRoleIsBelow = function (authorMember, mentionedMember) {
    if (bot.botMaintainers.includes(authorMember.user.id)) return true;
    return authorMember.highestRole.comparePositionTo(mentionedMember.highestRole) > 0;
};

/**
 * Converts colours into their hex code for ease of use.
 * @param colourCode
 * @returns {number}
 */
exports.getColour = function (colourCode) {

    if (colourCode.toLowerCase() == 'red') {
        return 0xCC0E0E;
    }
    else if (colourCode.toLowerCase() == 'blue') {
        return 0x0988B3;
    }
    else if (colourCode.toLowerCase() == 'green') {
        return 0x14E01D;
    }
    else if (colourCode.toLowerCase() == 'orange') {
        return 0xFF8C00;
    }
    else if (colourCode.toLowerCase() == 'yellow') {
        return 0xFFFF00;
    }
    else if (colourCode.toLowerCase() == 'purple') {
        return 0x4B0082;

    } else {
        return exports.getRandomColor();
    }
};

/**
 * Returns a random colour
 */
exports.getRandomColor = function () {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
};

/**
 * Cleans all zalgo from a string
 * @param string
 * @returns zalgo free string
 */
exports.cleanZalgo = function (string) {

    return string.replace(/[^\x00-\x7F]*$/g, '');
};

/**
 * Returns the guild log channel if there is one
 * @param guild
 * @returns {Promise}
 */
exports.getGuildLogChannel = function (guild) {
    return new Promise((resolve, reject) => {

        let logChannel = guild.channels.find('name', 'Log'); //TODO get this from the bot installer
        if (logChannel) resolve(logChannel);
        else reject();
    })
};

/**
 * Returns the staff role if there is one
 * @param guild
 * @returns {Promise}
 */
exports.getStaffRole = function (guild) {
    return new Promise((resolve, reject) => {

        let staffRole = guild.roles.find('name', 'Staff');
        if (staffRole) resolve(staffRole);
        else reject();
    })
}