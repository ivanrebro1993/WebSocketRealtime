import './App.css';
import React from 'react';
import LineChart from './components/LineChart';
import MetricsApi from './api/MetricsApi';
const config = require('../etc/config.json');

const api = new MetricsApi(config.api);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.initState();
        this.subscribeApi();
    }

    initState() {
        this.index = 0;
        this.metrics = {
            data: [],
            labels: []
        };
    }

    subscribeApi() {
        api.subscribe(
            metric => {
                this.index++;
                this.metrics.labels.push(this.index);
                this.metrics.data.push(metric);

                if (this.metrics.data.length > config.client.maxDataLenght) {
                    this.metrics.labels.shift();
                    this.metrics.data.shift();
                }

                this.forceUpdate();
            },
            config.client.interval
        );
    }

    render() {
        return (
            <div class='App'>
                <LineChart data={this.metrics.data} labels={this.metrics.labels} />
            </div>
        );
    }
}

export default App;
