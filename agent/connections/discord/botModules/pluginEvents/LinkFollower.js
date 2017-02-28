const logging = require("../../../../../modules/console.js");
const utils = require('./../utils');

const request = require('request');
const maxIter = 10;

exports.info = {
    name: 'Link-Follower'
};

const urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/ig;

String.prototype.replaceAll = function (search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}

exports.onMessage = function (message) {
    followLink(message);
};

function followLink(message) {

    try {

        let matches = message.content.match(urlRegex);
        if (!matches || matches.length == 0) return;

        for (let link of matches) {

            getRedirects(link, (redirects) => {
                let temp = [];
                let alrd = [];

                let c = 1;

                outer: for (let x of redirects) {

                    for (let x2 of alrd) {

                        if (x.replaceAll('/', '').replaceAll('www.', '').trim() === x2.replaceAll('/', '').replaceAll('www.', '').trim()) {
                            continue outer;
                        }
                    }
                    temp.push(`**#${c++}**: \`${x}\``);
                    alrd.push(x);
                }

                if (temp.length <= 1) return;

                message.reply(`That link redirects to:\n${temp.join('\n')}\n**Be careful clicking on links from people you do not know.**`);
            })
        }

    } catch (err) {
        logging.error(`Error while trying to follow link, Error: ${err.message}`);
        logging.debug(`Error stack trace: ${err.stack}`);
    }
}

/**
 * Returns a list of redirects of a URL
 * @param url
 * @param callback
 * @param cur
 * @param iter
 */
let getRedirects = function (url, callback, cur = [], iter = 0) {
    iter++;

    try {
        request({url: url, followRedirect: false}, (err, res, body) => {
            if (!res.headers.location || iter >= maxIter) return callback(cur);

            cur.push(res.headers.location);
            getRedirects(res.headers.location, callback, cur, iter);
        });
    } catch (err) {
        logging.error(`Error while trying to get link redirects, Error: ${err.message}`);
        logging.debug(`Error stack trace: ${err.stack}`);
    }
};