I'll help you push the code to your GitHub repository. First, let's organize the code and create a proper README.md file.

1. Create a README.md file in the root directory:
```markdown
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

```
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
```

## Setup Instructions

### Backend Setup

```bash
cd server
npm install
npm start
```

The server will start on port 1111.

### Frontend Setup

```bash
cd client
npm install
npm start
```

The frontend will start on port 3000.

## API Endpoints

- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create a new department
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create a new employee
```

2. Initialize Git and push to GitHub:
```bash
# Initialize Git repository
git init

# Create .gitignore
echo "node_modules/
.DS_Store
*.log
.env
employee_management.db" > .gitignore

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Employee Management System"

# Add remote repository
git remote add origin https://github.com/SAMARTHJAISWAL/ASQI-Assignment.git

# Push to main branch
git push -u origin main
```

3. Since we're using two separate applications (client and server), let's update the structure to make it clearer:
```bash
git branch -b develop
mkdir temp
mv client temp/
mv server temp/
cp -r temp/* ./
rm -rf temp
git add .
git commit -m "Restructured project for better organization"
git push origin develop
```

4. Create a pull request:
- Go to https://github.com/SAMARTHJAISWAL/ASQI-Assignment
- Click on "Pull requests"
- Click "New pull request"
- Select base: main and compare: develop
- Create pull request with description:
```
Added Employee Management System with:
- React frontend with shadcn/ui components
- Node.js backend with Express
- SQLite database
- Department and Employee management
- Filtering and search capabilities
```