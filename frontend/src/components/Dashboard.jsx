import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import TrafficChart from './TrafficChart';
import ProtocolBarChart from './ProtocolBarChart';
import AlertTable from './AlertTable';

const socket = io('http://localhost:5000');

const Dashboard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get('/api/logs')
            .then(response => setLogs(response.data))
            .catch(error => console.error('Error fetching logs:', error));

        socket.on('new_log', (log) => {
            setLogs(prevLogs => [log, ...prevLogs]);
        });

        return () => socket.off('new_log');
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Network Intrusion Detection System Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TrafficChart logs={logs} />
                <ProtocolBarChart logs={logs} />
            </div>
            <AlertTable logs={logs} />
        </div>
    );
}

export default Dashboard;
