#!/bin/bash

sqlite3 nids.db <<EOF
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY,
    timestamp TEXT,
    src_ip TEXT,
    dest_ip TEXT,
    proto TEXT,
    action TEXT,
    signature TEXT
);
EOF
