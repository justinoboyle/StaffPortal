/**
 * Help command
 * Part of the StaffPortal slack integration
 */

module.exports.name = "Help command";
module.exports.command = "help";
module.exports.description = "Shows the help message.";

module.exports.runCommand = function(rtm, message, args) {
  const main = require("../../main");

  let helpList = [];

  let msg = {
    "attachments": [{
      "fallback": "Hmm, Slack couldn't display this.",
      "pretext": "Here's a list of commands.",
      "fields": []
    }]
  };

  for (var command in main.commands) {
    if (!main.commands.hasOwnProperty(command))
      continue;

    msg.attachments.fields += {
      "title": command.command,
      "value": command.description
    };
  }

  rtm.sendMessage(JSON.parse(JSON.stringify(msg)), message.channel);
  rtm.sendMessage("Heads up! I've sent you a PM with a list of commands.", message.channel);
}