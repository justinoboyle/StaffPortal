const logging = require("../../../../../modules/console.js");
const utils = require('./../utils');

exports.info = {
    name: 'Welcome-Messages'
};

exports.onMessage = function (message) {
    // Not in agree channel or user is staff
    if (!isAgreeChannel(message.channel || message.member.roles.has(utils.getStaffRole(message.guild).id))) return;

    if (message.content.toLowerCase().includes('agree')) {
        let memberRole = getMemberRole(message.guild);
        if (memberRole) {

            message.member.addRole(memberRole).catch(err => {
                logging.error(`Unable to give user ${message.author.username} the member role, Error: ${err.message}`);
                logging.debug('Error stack trace: ' + err.stack);
            });
        }
        message.delete(2000).catch(err => {
            logging.error(`Unable to delete message in agree channel, Error: ${err.message}`);
            logging.debug(`Error stack trace: ${err.stack}`);
        })
    }
};

/**
 * Checks if the channel guild agree channel
 * @param msgChannel
 * @returns {boolean}
 */
function isAgreeChannel(msgChannel) {
    let agreeChannel = msgChannel.id; //TODO get agree channel id from db

    return msgChannel.id == agreeChannel.id;
}

/**
 * Gets the guild member role if there is one
 * @param guild
 * @returns The guild member role
 */
function getMemberRole(guild) {
    let memberRole = guild.roles.find('name', 'Member'); //TODO get this from the db
    if (memberRole) return memberRole;
}