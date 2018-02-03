const socketServer = require('socket.io')();
const config = require('../etc/config.json');

const apiConfig = config.api;
const min = apiConfig.min;
const max = apiConfig.max;
const port = apiConfig.port;

let metric = 0;

function getMetricValue() {
    let value = Math.random() * (max - min);
    return Math.floor(value) + min;
}

function startMetricsGenerator() {
    setInterval(() => {
        metric = getMetricValue();
        console.log(`[x] update metric value: ${metric}`);
    }, apiConfig.interval);
}

function clientConnectionHander(client) {
    let clientUpdateTimer = null;

    client.on('metrics', interval => {
        console.log(`[x] new client ${client.id} subscribe with interval ${interval}`);
        clientUpdateTimer = setInterval(() => {
            client.emit('update', metric);
            console.log('[x] send metric to ' + client.id);
        }, interval);
    });

    client.on('disconnect', () => {
        console.log(`[x] disconnect client ${client.id}`);
        clearInterval(clientUpdateTimer);
    });
}

function startSocketServer() {
    socketServer.on('connection', client => clientConnectionHander(client));
    socketServer.listen(port);
}

startMetricsGenerator();
startSocketServer();
console.log('[*] websockets server start listening ...');