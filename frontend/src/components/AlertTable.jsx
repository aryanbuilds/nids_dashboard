import React from 'react';

const AlertTable = ({ logs }) => {
    return (
        <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">Latest Alerts</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Timestamp</th>
                        <th className="py-2">Source IP</th>
                        <th className="py-2">Destination IP</th>
                        <th className="py-2">Protocol</th>
                        <th className="py-2">Action</th>
                        <th className="py-2">Signature</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index} className="border-t">
                            <td className="py-2 px-4">{log.timestamp}</td>
                            <td className="py-2 px-4">{log.src_ip}</td>
                            <td className="py-2 px-4">{log.dest_ip}</td>
                            <td className="py-2 px-4">{log.proto}</td>
                            <td className="py-2 px-4">{log.action}</td>
                            <td className="py-2 px-4">{log.signature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlertTable;
