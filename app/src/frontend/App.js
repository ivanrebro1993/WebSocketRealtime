import './App.css';
import React from 'react';
import { Line } from 'react-chartjs-2';
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
                <Line data={{
                   labels: this.state.labels,
                       datasets: [
                           {
                               label: `Metrics values from server`,
                               fill: true,
                               lineTension: 0.1,
                               backgroundColor: 'rgba(75,192,192,0.4)',
                               borderColor: 'rgba(75,192,192,1)',
                               borderCapStyle: 'butt',
                               borderDash: [],
                               borderDashOffset: 0.0,
                               borderJoinStyle: 'miter',
                               pointBorderColor: 'rgba(75,192,192,1)',
                               pointBackgroundColor: '#fff',
                               pointBorderWidth: 1,
                               pointHoverRadius: 5,
                               pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                               pointHoverBorderColor: 'rgba(220,220,220,1)',
                               pointHoverBorderWidth: 2,
                               pointRadius: 1,
                               pointHitRadius: 10,
                               data: this.state.data
                           }
                     ]
                   }} redraw />
            </div>
        );
    }
}

export default App;
