const socketServer = require('socket.io')();
const config = require('../etc/config.json');

const min = config.api.min;
const max = config.api.max;
const port = config.api.port;

let metric = 0;

function getMetricValue() {
    let value = Math.random() * (max - min);
    return Math.floor(value) + min;
}

function startMetricsGenerator() {
    setInterval(() => {
        metric = getMetricValue();
        console.log(`metric value: ${metric}`);
    }, config.api.interval);
}

function startSocketServer() {
    socketServer.on('connection', client => {
        client.on('metrics', interval => {
            console.log(`new client ${client.id} subscribe with interval ${interval}`);
            setInterval(() => {
                client.emit('update', metric);
            }, interval);
        });
    });

    socketServer.listen(port);
    console.log('websockets server start listening');
}

startMetricsGenerator();
startSocketServer();