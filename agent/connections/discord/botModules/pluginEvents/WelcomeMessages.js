const logging = require("../../../../../modules/console.js");
const utils = require('./../utils');

exports.info = {
    name: 'Welcome-Messages'
};

exports.onGuildMemberAdd = function (guildMember) {
    let embed = utils.getSimpleEmbed("Welcome!", `**${guildMember.user.username}** has joined ${guildMember.guild.name}! Make sure you follow the rules`, utils.getRandomColor());
    guildMember.guild.defaultChannel.sendEmbed(embed);

    utils.getGuildLogChannel(guildMember.guild).then(channel => {

        let embed = utils.getSimpleEmbed("User Join", `${guildMember.user.username} has joined the server!`, utils.getColour("yellow"));
        channel.sendEmbed(embed);
    })
};

exports.onGuildBanAdd = function (guild, user) {

    let embed = utils.getSimpleEmbed("Banned!", `**${user.username}** has been banned for not following the rules!`, utils.getColour('red'), true);
    guild.defaultChannel.sendEmbed(embed);

    utils.getGuildLogChannel(guild).then(channel => {

        let embed = utils.getSimpleEmbed("User Banned", `${user.username} has been banned on the server!`, utils.getColour("yellow"));
        channel.sendEmbed(embed);
    })
};

exports.onGuildBanRemove = function (guild, user) {

    let embed = utils.getSimpleEmbed("Un-Banned!", `Everyone welcome **${user.username}** back to **"${guild.name}**! Please make sure to follow the rules this time!`, utils.getColour('yellow'));
    guild.defaultChannel.sendEmbed(embed);

    utils.getGuildLogChannel(guild).then(channel => {

        let embed = utils.getSimpleEmbed("User Un-Banned", `${user.username} has been un-banned on the server!`, utils.getColour("yellow"));
        channel.sendEmbed(embed);
    })
};