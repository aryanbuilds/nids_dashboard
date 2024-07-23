import json
import sqlite3
import time

DB_PATH = 'nids.db'
LOG_FILE_PATH = '/var/log/suricata/eve.json'

def create_table():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY,
            timestamp TEXT,
            src_ip TEXT,
            dest_ip TEXT,
            proto TEXT,
            action TEXT,
            signature TEXT
        )
    ''')
    conn.commit()
    conn.close()

def insert_log(data):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO logs (timestamp, src_ip, dest_ip, proto, action, signature)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (data['timestamp'], data['src_ip'], data['dest_ip'], data['proto'], data['action'], data['signature']))
    conn.commit()
    conn.close()

def tail_log():
    with open(LOG_FILE_PATH, 'r') as f:
        while True:
            line = f.readline()
            if not line:
                time.sleep(1)
                continue
            data = json.loads(line)
            if data.get('event_type') == 'alert':
                log_data = {
                    'timestamp': data['timestamp'],
                    'src_ip': data['src_ip'],
                    'dest_ip': data['dest_ip'],
                    'proto': data['proto'],
                    'action': data['alert']['action'],
                    'signature': data['alert']['signature']
                }
                insert_log(log_data)

if __name__ == '__main__':
    create_table()
    tail_log()
