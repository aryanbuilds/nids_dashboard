from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_PATH = 'nids.db'

@app.route('/api/logs', methods=['GET'])
def get_logs():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM logs ORDER BY timestamp DESC LIMIT 100')
    rows = cursor.fetchall()
    conn.close()
    logs = []
    for row in rows:
        logs.append({
            'timestamp': row[1],
            'src_ip': row[2],
            'dest_ip': row[3],
            'proto': row[4],
            'action': row[5],
            'signature': row[6]
        })
    return jsonify(logs)

if __name__ == '__main__':
    app.run(debug=True)
