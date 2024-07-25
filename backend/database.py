#Initializes the database.
import sqlite3
from config import Config

def initialize_db():
    conn = sqlite3.connect(Config.DB_PATH)
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

if __name__ == '__main__':
    initialize_db()
