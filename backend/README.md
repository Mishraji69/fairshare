# ShareFare Backend

A production-ready expense sharing system backend built with Node.js, Express, and PostgreSQL.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv
- CORS

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── schema.sql
│   ├── controllers/
│   │   └── healthController.js
│   ├── routes/
│   │   └── healthRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Group.js
│   │   └── Expense.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a PostgreSQL database named `fairshare_ai`:

```bash
psql -U postgres
CREATE DATABASE fairshare_ai;
\c fairshare_ai
```

### 3. Run Database Schema

Execute the schema file to create all tables:

```bash
psql -U postgres -d fairshare_ai -f src/config/schema.sql
```

### 4. Configure Environment Variables

Update the `.env` file with your PostgreSQL credentials:

```
PORT=5000
DB_USER=postgres
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=fairshare_ai
DB_HOST=localhost
DB_PORT=5432
```

### 5. Start the Server

Development mode with auto-restart:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/health`
  - Response: `{ "status": "ShareFare API running" }`

## Database Schema

### Tables

- **users**: User accounts
- **groups**: Expense groups
- **group_members**: Group membership
- **expenses**: Expense records
- **expense_splits**: Split details for each expense

## Models

- **User.js**: User management operations
- **Group.js**: Group and membership operations
- **Expense.js**: Expense and split operations

## Development

The server runs on port 5000 by default. You can change this in the `.env` file.
