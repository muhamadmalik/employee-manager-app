# Employee Manager App

This project is a small simulation tool where employees try to access secure rooms. Access depends on their level, time of access, and cooldown rules.

## Setup

### Backend
Go inside backend folder and run:
```bash
cd backend
npm install
npm run dev
```
Runs on http://localhost:5000

```bash


Go inside frontend folder and run:

cd frontend/employee_manager
npm install
npm run dev

```
Runs on http://localhost:5173

Usage

From the frontend, upload a JSON file with employee data.

Click on Simulate Access to see results.

Or send a POST request to /api/access/simulate with employees data.
