/**
 * Hi command
 * Part of the StaffPortal Slack integration.
 */

module.exports.name = "Hi command";
module.exports.command = "hi";
module.exports.description = "Says hello!";

module.exports.runCommand = function(rtm, message, args) {
  rtm.sendMessage(`What's up, <@${message.user}>? I'm StaffPortal.`, message.channel);
};