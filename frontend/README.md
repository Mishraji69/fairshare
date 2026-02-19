# ShareFare Frontend

A modern React frontend for the ShareFare expense sharing application.

## Tech Stack

- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Context API

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── GroupCard.jsx
│   │   ├── ExpenseList.jsx
│   │   └── AddExpenseModal.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── GroupDetail.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## Features

### Authentication
- Login and Register pages
- JWT token-based authentication
- Protected routes
- Persistent login sessions

### Dashboard
- View all expense groups
- Create new groups
- Navigate to group details

### Group Details
- View all expenses in a group
- Add new expenses
- See total expenses
- Track who paid for each expense

## Backend Integration

The frontend integrates with the backend API at `http://localhost:5000`

### API Endpoints Used

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /groups` - Get all groups
- `POST /groups` - Create a new group
- `GET /expenses/:groupId` - Get expenses for a group
- `POST /expenses` - Add a new expense

### Data Format

The frontend uses snake_case to match backend field names:
- `created_at`
- `group_id`
- `paid_by`
- `amount_owed`

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Groups**: Click "Create Group" on the dashboard
3. **Add Expenses**: Navigate to a group and click "Add Expense"
4. **View History**: See all expenses with timestamps and amounts

## Development

The app uses:
- Functional components only
- React Hooks (useState, useEffect, useContext)
- Context API for global state management
- Tailwind CSS for styling
- Axios interceptors for auth headers

## Environment

Make sure your backend is running on `http://localhost:5000` before starting the frontend.
