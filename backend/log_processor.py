#Parses Suricata log files and stores them in the database.
import sqlite3
import re
from config import Config

def parse_log(log_line):
    pattern = r'(\d{2}/\d{2}/\d{4}-\d{2}:\d{2}:\d{2}\.\d+)\s+\[\]\s+\[\d+:\d+:\d+\]\s+(.*?)(\[.*?\])\s+\[Classification: (.*?)\]\s+\[Priority: (\d+)\]\s+\{(\w+)\}\s+(\d+\.\d+\.\d+\.\d+):(\d+)\s+->\s+(\d+\.\d+\.\d+\.\d+):(\d+)'
    match = re.match(pattern, log_line)
    if match:
        return {
            'timestamp': match.group(1),
            'signature': match.group(2),
            'classification': match.group(4),
            'priority': match.group(5),
            'protocol': match.group(6),
            'src_ip': match.group(7),
            'src_port': match.group(8),
            'dest_ip': match.group(9),
            'dest_port': match.group(10)
        }
    return None

def store_log(log_data):
    conn = sqlite3.connect(Config.DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO logs (timestamp, src_ip, dest_ip, proto, action, signature)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (log_data['timestamp'], log_data['src_ip'], log_data['dest_ip'], log_data['protocol'], log_data['classification'], log_data['signature']))
    conn.commit()
    conn.close()

def process_log_file():
    with open(Config.LOG_PATH, 'r') as file:
        for line in file:
            log_data = parse_log(line)
            if log_data:
                store_log(log_data)

if __name__ == '__main__':
    process_log_file()
