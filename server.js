var http = require('http');
const app = require("./app");
const host = "localhost";
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, host, () => {
    console.log(`Server start at ${host}:${port}`);
});