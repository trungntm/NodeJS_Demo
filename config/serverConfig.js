let serverConfig = {};

serverConfig.serverHost = `localhost`;
serverConfig.serverPort = process.env.port || 3000;

module.exports = serverConfig;