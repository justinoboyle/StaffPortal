const logging = require("../../../../../modules/console.js");
const utils = require('./../utils');

exports.info = {
    name: 'Username-Checker'
};

exports.onGuildMemberAdd = function (guildMember) {

    checkUsername(guildMember)
};

exports.onGuildMemberUpdate = function (oldMember, newMember) {
    checkUsername(newMember);
};

/**
 * @returns {Promise} Returns an array of blocked names
 */
function getBannedWords() {
    return new Promise((resolve, reject) => {
        try {
            let bannedNames = [];
            // TODO get banned words from db

            resolve(bannedNames);
        } catch (err) {
            reject(err);
        }
    })
}

/**
 * Checks to see if a members display name contains any of the blocked names
 * @param guildMember
 */
function checkUsername(guildMember) {
    getBannedWords().then(bannedWords => {

        bannedWords.forEach(word => {

            if (guildMember.displayName.toLowerCase().includes(word.toLowerCase())) {
                handleBlockedName(guildMember);
            }
        })
    }).catch(err => {
        logging.error('Error retrieving banned words, Error: ' + err.message);
        logging.debug('Error stack trace: ' + err.stack);
    })
}

/**
 * Handles a blocked username
 * @param guildMember
 */
function handleBlockedName(guildMember) {
    //TODO read from db to see what to do
}

