import React, { useState, useEffect } from 'react'
import './App.css'
import Chart from 'chart.js/auto'

function App() {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        fetchLogs()
        const interval = setInterval(fetchLogs, 5000)
        return () => clearInterval(interval)
    }, [])

    const fetchLogs = async () => {
        const response = await fetch('http://localhost:5000/api/logs')
        const data = await response.json()
        setLogs(data)
        updateChart(data)
    }

    const updateChart = (data) => {
        const ctx = document.getElementById('trafficChart').getContext('2d')
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(log => log.timestamp),
                datasets: [{
                    label: 'Network Traffic',
                    data: data.map(log => log.signature),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }
        })
    }

    return (
        <div className="App">
            <h1>Network Intrusion Detection System</h1>
            <canvas id="trafficChart"></canvas>
        </div>
    )
}

export default App
