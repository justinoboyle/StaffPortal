const redis = require('redis')
const bluebird = require('bluebird')
const cluster = require('cluster')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
client.on('error', (err) => {
  //TODO
})

module.exports = client;
