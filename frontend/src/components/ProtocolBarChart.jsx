import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ProtocolBarChart = ({ logs }) => {
    const protocolCounts = logs.reduce((acc, log) => {
        acc[log.proto] = (acc[log.proto] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(protocolCounts),
        datasets: [
            {
                label: 'Protocol Distribution',
                data: Object.values(protocolCounts),
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Protocol Distribution</h2>
            <Bar data={data} />
        </div>
    );
};

export default ProtocolBarChart;
