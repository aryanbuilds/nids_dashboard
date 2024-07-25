import os

class Config:
    DB_PATH = os.getenv('DB_PATH', 'nids.db')
    LOG_PATH = os.getenv('LOG_PATH', '/var/log/suricata/fast.log')
