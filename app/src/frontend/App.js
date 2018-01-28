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
        this.state = {
            data: [],
            labels: [],
            index: 0
        };
    }

    subscribeApi() {
        api.subscribe(
            metric => {
                this.state.index++;
                this.state.labels.push(this.state.index);
                this.state.data.push(metric);

                if (this.state.data.length > config.client.maxDataLenght) {
                    this.state.labels.shift();
                    this.state.data.shift();
                }

                this.forceUpdate();
            },
            config.client.interval
        );
    }

    render() {
        return (
            <div class='App'>
                <LineChart data={this.state.data} labels={this.state.labels} />
            </div>
        );
    }
}

export default App;
