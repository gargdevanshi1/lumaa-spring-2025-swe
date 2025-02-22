

---

## Overview

A “Task Management” application using **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application:

1. **Registers** and **Logs in** users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

---

## Implementation and Execution

### 1. Backend Setup
- 'cd lumaa-backend'
- `npm install` to install dependencies
- `npm run start` to run the server
- Environment variables are added in the `.env` file
   - Database connection string
   - JWT secret
 
### 2. Frontend Setup
- In a new terminal, 'cd lumaa-frontend`
- `npm install` then `npm start` to run
- App runs locally at http://localhost:3000 in the browser

### 3. Database Setup

- Install the Postgres application on your local system
- Execute the Migration script `psql -U username -d database -f migrations/init.sql`
- Tables are as follows:
   - **User Model**:
     - `id`: Primary key
     - `username`: Unique string
     - `password`: Hashed string
   - **Task Model**:
     - `id`: Primary key
     - `title`: string
     - `description`: string (optional)
     - `isComplete`: boolean (default `false`)
     - `userId` to link tasks to the user who created them

### 4. Error Handling
- Incorrect credentials are handled with appropriate error messages.
- Task title is required when adding a new task.
- Only authenticated users can access the task list.
- Duplicate registration is prevented for the same user.

### 5. Link to the video 
https://youtu.be/1jT0yyyi1_A

#### Expected pay: $35/hour
---
