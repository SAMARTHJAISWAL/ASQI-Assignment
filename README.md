# Employee Management System (ASQI Assignment)

A small full-stack app for managing departments and employees: a React frontend talking to a Node.js / Express REST API backed by SQLite.

## Features

- Add departments (name + optional description); duplicate names are rejected.
- Add employees with a name, a department (picked from existing departments) and an address.
- Employee table with filtering by name and by department.
- Validation and error messages from the API are shown in the UI.
- Data is stored in a local SQLite file and persists across server restarts.

## Tech stack

- **Frontend:** React 19 built with Vite 8, Tailwind CSS 3, shadcn/ui-style components built on Radix UI Select
- **Backend:** Node.js, Express 4, `sqlite3`
- **Tests:** Vitest + React Testing Library (jsdom)

## Getting started

Requirements: Node.js 20.19+ or 22.12+ (required by Vite 8; tested with Node 26).

### 1. Backend (port 1111)

```bash
cd server
npm install
npm start          # or: npm run dev  (nodemon)
```

The SQLite database file `server/employee_management.db` is created automatically on first start.

| Env var | Default | Description |
| --- | --- | --- |
| `PORT` | `1111` | API port |
| `DB_PATH` | `server/employee_management.db` | SQLite file location |

### 2. Frontend (port 3000)

```bash
cd client
npm install
npm run dev        # or: npm start (alias)
```

Open <http://localhost:3000>. The frontend calls `http://localhost:1111/api` by default; to point it elsewhere, copy `client/.env.example` to `client/.env` and set `VITE_API_URL` (Vite only exposes variables prefixed with `VITE_`; they are read at dev-server start / build time).

Other client scripts:

```bash
npm test           # run the test suite once (Vitest); npm run test:watch to watch
npm run build      # production build in client/build
npm run preview    # serve the production build on http://localhost:3000
```

## API

| Method | Endpoint | Body | Notes |
| --- | --- | --- | --- |
| GET | `/api/departments` | — | All departments, sorted by name |
| POST | `/api/departments` | `{ "name", "description"? }` | `400` if name missing, `409` if it already exists |
| GET | `/api/employees` | — | All employees |
| POST | `/api/employees` | `{ "name", "department", "address"? }` | `400` if name/department missing or the department doesn't exist |

## Project structure

```
client/
  index.html                 HTML entry (loads src/index.jsx)
  public/                    static assets: favicon, manifest, robots.txt
  src/
    index.jsx                React entry point
    App.jsx                  forms, employee list, API calls
    App.test.jsx             render test with mocked fetch
    components/ui/           Button, Input, Select, Alert
    index.css                Tailwind + theme CSS variables
  vite.config.mjs            Vite + Vitest config (dev port 3000, output in build/)
  tailwind.config.js
server/
  server.js                  Express app
  config/database.js         SQLite connection + table creation
  controllers/               department and employee handlers
  routes/                    route definitions
```
