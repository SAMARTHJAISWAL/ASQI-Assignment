# Employee Management System

A full-stack employee management system built with React, Node.js, Express, and SQLite.

## Features

- Add and manage departments
- Add and manage employees
- Filter employees by name and department
- Responsive design
- Real-time updates

## Tech Stack

- Frontend: React with shadcn/ui components
- Backend: Node.js with Express
- Database: SQLite3
- Styling: Tailwind CSS

## Project Structure

employee-management/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── ui/        # UI components
│       ├── App.js
│       ├── index.js
│       └── index.css
└── server/                # Node.js backend
├── config/
├── controllers/
├── routes/
└── server.js

## Setup Instructions

### Backend Setup

```bash
cd server
npm install
npm start

The server will start on port 1111.
FFrontend Setup
bashCopycd client
npm install
npm start
The frontend will start on port 3000.
API Endpoints

GET /api/departments - Get all departments
POST /api/departments - Create a new department
GET /api/employees - Get all employees
POST /api/employees - Create a new employee

