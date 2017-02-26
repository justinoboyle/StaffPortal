const logging = require("../modules/console.js");
const fs = require('fs');
let plugins = [];

/**
 * Initialises all the plugins and runs their main method.
 */
exports.initPlugins = function () {

    walkDirs(__dirname).forEach((file) => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;
        let plugin = require(file);

        if (typeof plugin.runPlugin !== 'function' || typeof plugin.info !== 'object' || typeof plugin.info.enabled !== 'boolean') {
            logging.error(`Invalid plugin file ${file}`);
            return;
        }
        plugins.push(plugin);
        logging.info(`Initialising ${plugins.length} plugins...`);
        plugin.runPlugin();
    })
};

/**
 * Lists out the files in the plugin folders.
 * @param dir
 * @returns {Array}
 */
function walkDirs(dir) {
    let results = [];
    let list = fs.readdirSync(dir);

    list.forEach((file) => {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walkDirs(file));
        else results.push(file);
    });

    return results
}