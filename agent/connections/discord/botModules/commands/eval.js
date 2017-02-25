exports.info = {
    name: 'eval',
    usage: 'eval <code>',
    description: 'Evaluates arbitrary JavaScript'
};

exports.run = function (bot, msg, args) {
    let code = args.join(' ');

    try {
        let evaled = eval(code);
        if (typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled);
        }
        msg.channel.sendMessage('```xl\n' + clean(evaled) + '\n```');
    }
    catch (err) {
        bot.logging.error('Error while trying eval, Error: ' + err);
        bot.logging.debug('Error stacktrace: ' + err.stack);
    }
};

function clean(text) {
    if (typeof (text) === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else {
        return text;
    }
}