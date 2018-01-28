import sockets from 'socket.io-client';

class MetricsApi {
    constructor(config) {
        this.socketServer = sockets(`http://${config.host}:${config.port}`);
    }

    subscribe(handler, interval) {
        this.socketServer.on('update', metric => handler(metric));
        this.socketServer.emit('metrics', interval);
    }
}

export default MetricsApi;