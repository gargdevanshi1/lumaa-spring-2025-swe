

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

### 1. Database Setup

- Install the Postgres application on your local system
- Execute the Migration script
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

### 2. Backend Setup
- `npm install` to install dependencies
- `npm run start` to run the server
- Environment variables are added in the `.env` file
   - Database connection string
   - JWT secret
 
### 3. Frontend Setup
- `npm install` then `npm start` to run.
- Base URL is added in the `.env` file

### 4. Error Handling

---
