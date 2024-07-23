#!/bin/bash

# Run setup_db.sh
./setup_db.sh

# Check if setup_db.sh executed successfully
if [ $? -eq 0 ]; then
    echo "Database setup completed successfully"
else
    echo "Database setup failed"
    exit 1
fi

# Run setup_env.sh
./setup_env.sh

# Check if setup_env.sh executed successfully
if [ $? -eq 0 ]; then
    echo "Environment setup completed successfully"
else
    echo "Environment setup failed"
    exit 1
fi

echo "All setup scripts executed successfully"
