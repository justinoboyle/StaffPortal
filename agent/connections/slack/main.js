/**
 * StaffPortal Slack plugin
 * Copyright (c) Gilbert Gobbels. All rights reserved.
 */

exports.info = {
  "name": "Slack RTM Integration",
  "enabled": true
};

exports.runPlugin = function() {
  // StaffPortal dependencies
  const config = require("./config.json");
  const logging = require("../../../modules/console.js");

  logging.log("Hi! I'm the Slack connection, and if you see this then I'm alive!");

  // NPM dependencies
  const RtmClient = require("@slack/client").RtmClient;
  const RTM_EVENTS = require("@slack/client").RTM_EVENTS;

  // Slack API init
  const rtm = new RtmClient(config.token);

  // Commands
  const commands = {
    "hi": require("./modules/cmd/hi"),
    "help": require("./modules/cmd/help")
  };
  
  // Export the commands
  module.exports.commands = commands;

  rtm.start();

  // Events
  //    Authenticated
  rtm.on(RTM_EVENTS.AUTHENTICATED, function(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  });

  //    Message
  rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    if (message.text.startsWith(config.prefix)) {

      let args = message.text.split(" ");
      let cmd = args.shift().toLowerCase().replace(config.prefix, "");

      let actualCommand = commands[cmd];

      if (actualCommand !== undefined) {
        console.log(`[Command] User ${message.user} executed in ${message.channel}: ${message.text}`);
        actualCommand.runCommand(rtm, message, args);
      }
    }
  });
};

exports.runPlugin();