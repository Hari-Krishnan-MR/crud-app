# Student Management CRUD App

A full-stack web application built as part of my MSc Data Analytics studies. This project lets you manage student records through a clean, interactive interface — you can add, view, edit, search and delete students in real time.

---

## What This App Does

- View all students in a table
- Search students by their ID or name (results update as you type)
- Add a new student using a popup form
- Edit an existing student's details
- Delete a student with a confirmation prompt
- Pagination so the table doesn't get overwhelming as data grows

---

## Why I Built This

This started as a way to learn how a real full-stack application works — how a frontend talks to a backend, how a backend talks to a database, and how all three pieces fit together. Coming from a Java background, I wanted to understand how the same concepts translate into Python and React.

---

## Tech Stack

**Backend**
- Python with FastAPI — handles all the API endpoints
- SQLAlchemy — connects Python to the database
- MySQL — stores the student data

**Frontend**
- React — builds the interactive UI
- Axios — sends requests from the frontend to the backend
- CSS with inline styles — keeps the orange themed design clean

---

## Project Structure

```
crud-app/
├── backend/
│   ├── main.py          → all API endpoints (GET, POST, PUT, DELETE)
│   ├── models.py        → defines the student table structure
│   ├── database.py      → connects to MySQL
│   └── .env             → stores database credentials (not uploaded to GitHub)
└── frontend/
    └── src/
        ├── constants.js              → all API URLs in one place
        ├── services/
        │   └── studentService.js     → all API call functions
        ├── components/
        │   ├── SearchBar.jsx         → search inputs
        │   ├── StudentTable.jsx      → data table with pagination
        │   └── StudentModal.jsx      → create and edit popup form
        └── App.jsx                   → main page that brings everything together
```

---

## API Endpoints

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get a student by ID |
| GET | `/students/search/by-name?name=` | Search students by name |
| POST | `/students` | Add a new student |
| PUT | `/students/{id}` | Update a student |
| DELETE | `/students/{id}` | Delete a student |

---

## How to Run This Locally

**1. Clone the repo**
```
git clone https://github.com/Hari-Krishnan-MR/crud-app.git
cd crud-app
```

**2. Set up the backend**
```
cd backend
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv
```

Create a `.env` file inside the backend folder:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=crud_app
```

Run the backend:
```
uvicorn main:app --reload
```

**3. Set up the frontend**
```
cd frontend
npm install
npm run dev
```

**4. Open the app**

Go to `http://localhost:5173` in your browser.

---

## What I Learned

- How REST APIs work and how to build them in Python
- How React manages data with state and re-renders the UI automatically
- How to separate concerns cleanly — constants, services, and components each have one job
- How Git and GitHub work for version control
- How all the pieces of a full-stack app connect end to end

---

## Future Plans

- Add more tables like courses and grades with relationships between them
- Add data visualisation charts showing student distribution
- Add a login and authentication system
- Deploy the app online so it can be accessed from anywhere
- Connect a Jupyter notebook to the same database for deeper analysis

---

*Built by Harikrishnan — MSc Data Analytics*