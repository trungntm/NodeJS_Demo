var http = require('http');
const app = require("./app");
const serverConfig = require('./config/serverConfig');
const server = http.createServer(app);
server.listen(serverConfig.serverPort, serverConfig.serverHost, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log(`Server start at ${serverConfig.serverPort}:${serverConfig.serverHost}`);
});