# Finance Data Processing and Access Control Backend

A backend system for a finance dashboard with role-based access control.

## Tech Stack
- Node.js + Express
- PostgreSQL
- JWT Authentication
- bcryptjs

## Setup Instructions

1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Create PostgreSQL database
```bash
psql -U postgres
CREATE DATABASE finance_db;
```

4. Create `.env` file
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

5. Run database migrations
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('viewer', 'analyst', 'admin')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_records (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

6. Start the server
```bash
npm run dev
```

## API Endpoints

### Auth
| Method | URL | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login user |

### Users
| Method | URL | Access | Description |
|---|---|---|---|
| GET | /api/users | Admin | Get all users |
| GET | /api/users/:id | Admin | Get user by id |
| PATCH | /api/users/:id/role | Admin | Update user role |
| PATCH | /api/users/:id/status | Admin | Update user status |

### Financial Records
| Method | URL | Access | Description |
|---|---|---|---|
| POST | /api/records | Admin | Create record |
| GET | /api/records | Admin, Analyst | Get all records |
| PUT | /api/records/:id | Admin | Update record |
| DELETE | /api/records/:id | Admin | Delete record |

### Dashboard
| Method | URL | Access | Description |
|---|---|---|---|
| GET | /api/dashboard/summary | Admin, Analyst | Total income, expenses, balance |
| GET | /api/dashboard/category-wise | Admin, Analyst | Category breakdown |
| GET | /api/dashboard/trends | Admin, Analyst | Monthly trends |
| GET | /api/dashboard/recent | Admin, Analyst | Recent activity |

## Roles & Permissions

| Feature | Viewer | Analyst | Admin |
|---|---|---|---|
| Register/Login | ✅ | ✅ | ✅ |
| View Dashboard | ❌ | ✅ | ✅ |
| View Records | ❌ | ✅ | ✅ |
| Create Records | ❌ | ❌ | ✅ |
| Update Records | ❌ | ❌ | ✅ |
| Delete Records | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

## Filtering Records
```
GET /api/records?type=income
GET /api/records?category=salary
GET /api/records?date=2026-04-01
GET /api/records?type=income&category=salary
```

## Assumptions Made

- Viewer role can only login — no data access in this version
- Admin is the only role that can create/modify financial records
- Soft deactivation of users via status field instead of deletion
- JWT tokens expire in 7 days
- All amounts stored as DECIMAL for financial precision

## Project Structure
```
src/
├── config/        → Database connection
├── middleware/    → Auth, role, error handlers
├── modules/
│   ├── auth/      → Register, login
│   ├── users/     → User management
│   ├── records/   → Financial records CRUD
│   └── dashboard/ → Analytics APIs
└── app.js
```