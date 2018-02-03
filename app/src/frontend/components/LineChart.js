import React from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends React.Component {
    getDataset(data) {
        return {
            label: 'Metrics values from websockets server',
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
            data: data
        };
    }

    getLineData(data, labels) {
        return {
            labels: labels,
            datasets: [ this.getDataset(data) ]
        };
    }

    render() {
        return (
            <Line
                data={ this.getLineData(this.props.data, this.props.labels) }
                redraw />
        );
    }
}

export default LineChart;