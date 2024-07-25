import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TrafficChart = ({ logs }) => {
    const data = {
        labels: logs.map(log => log.timestamp),
        datasets: [
            {
                label: 'Network Traffic',
                data: logs.map(log => parseInt(log.src_port, 10)),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Traffic Over Time</h2>
            <Line data={data} />
        </div>
    );
};

export default TrafficChart;
