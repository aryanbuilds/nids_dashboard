# Setup Steps
>[!info] SURICATA REQUIRED TO SETUP FOLLOW ANY ONLINE RESOURCE FOR THIS.
## Set up environment:
```
bash setup_env.sh
```
## Set up database:
```
bash setup_db.sh
```
## Start backend:
```
source venv/bin/activate
python app.py
```
## Start frontend:
```
cd frontend
npm install
npm run dev
```
---

# Convert to Daemon Process

## On Linux:
### Create a systemd service file:
```
sudo nano /etc/systemd/system/nids-backend.service
```
### Content:
```
[Unit]
Description=Network Intrusion Detection System Backend
After=network.target

[Service]
User=nids
WorkingDirectory=/path/to/NIDS_DASHBOARD/backend
ExecStart=/path/to/NIDS_DASHBOARD/backend/venv/bin/python /path/to/NIDS_DASHBOARD/backend/app.py
Restart=always

[Install]
WantedBy=multi-user.target
```
### Enable and start the service:
```
sudo systemctl daemon-reload
sudo systemctl start nids-backend
sudo systemctl enable nids-backend
```
## On Windows:
### Install NSSM:
- Download and extract NSSM.
- Add the path to NSSM in your environment variables.

### Create a service using nssm:
```
nssm install nids-backend
```
### Configure the service:
- Path: C:\path\to\NIDS_DASHBOARD\backend\venv\Scripts\python.exe
- Startup directory: C:\path\to\NIDS_DASHBOARD\backend
- Arguments: C:\path\to\NIDS_DASHBOARD\backend\app.py
  
### Start the service:
```
nssm start nids-backend
```
-[X]This setup should ensure your project is properly structured and ready for deployment. 
