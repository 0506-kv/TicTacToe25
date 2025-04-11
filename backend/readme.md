# TicTacToe25 - Backend

## Prerequisites
- Node.js (v14.x or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/TicTacToe25.git
cd TicTacToe25/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=4000
DB_CONNECT=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tictactoe25?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### 4. Start the server
```bash
npx nodemon
```

## API Endpoints

### User Routes

#### 1) POST /users/register

**Description**
Registers a new user in the system.

**Status Codes**
- `201 Created` - User registered successfully
- `400 Bad Request` - Validation errors or user already exists

**Request Body**
| Field      | Type   | Required | Description                     |
|------------|--------|----------|---------------------------------|
| `username` | String | Yes      | Unique username                 |
| `email`    | String | Yes      | Valid email address             |
| `password` | String | Yes      | Password (will be hashed)       |

**Example Request**
```json
{
    "username": "player1",
    "email": "player1@example.com",
    "password": "securepassword"
}
```

**Example Response**
```json
{
    "message": "User registered successfully",
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "username": "player1",
        "email": "player1@example.com"
    }
}
```

#### 2) POST /users/login

**Description**
Authenticates a user and returns a JWT token.

**Status Codes**
- `200 OK` - Login successful
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Invalid credentials

**Request Body**
| Field      | Type   | Required | Description                     |
|------------|--------|----------|---------------------------------|
| `email`    | String | Yes      | User's email address            |
| `password` | String | Yes      | User's password                 |

**Example Request**
```json
{
    "email": "player1@example.com",
    "password": "securepassword"
}
```

**Example Response**
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "username": "player1",
        "email": "player1@example.com"
    }
}
```

#### 3) GET /users/profile

**Description**
Retrieves the profile of the currently authenticated user.

**Status Codes**
- `200 OK` - Profile retrieved successfully
- `401 Unauthorized` - No valid token provided

**Headers**
| Name            | Required | Description                           |
|-----------------|----------|---------------------------------------|
| `Authorization` | Yes      | Bearer token from login               |

**Example Response**
```json
{
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "username": "player1",
        "email": "player1@example.com"
    }
}
```

#### 4) GET /users/logout

**Description**
Logs out the current user by blacklisting their JWT token.

**Status Codes**
- `200 OK` - Logout successful
- `401 Unauthorized` - No valid token provided

**Headers**
| Name            | Required | Description                           |
|-----------------|----------|---------------------------------------|
| `Authorization` | Yes      | Bearer token from login               |

**Example Response**
```json
{
    "message": "Logged out successfully"
}
```

## WebSocket Implementation
The backend uses Socket.io for real-time communication between players:

### Event Handlers

| Event                | Description                                        |
|----------------------|----------------------------------------------------|
| `connection`         | Handles new socket connections
| `disconnect`         | Handles player disconnections                      |


## Database Models

### User Schema
| Field       | Type     | Description                           | Constraints        |
|-------------|----------|---------------------------------------|-------------------|
| `_id`       | ObjectId | Unique identifier                     | Auto-generated    |
| `username`  | String   | User's display name                   | Required, unique  |
| `email`     | String   | User's email address                  | Required, unique  |
| `password`  | String   | Hashed password                       | Required, hidden  |
| `socketId`  | String   | Current socket connection ID          | Optional          |

### BlacklistToken Schema
| Field       | Type     | Description                           | Constraints        |
|-------------|----------|---------------------------------------|-------------------|
| `token`     | String   | JWT token that has been invalidated   | Required, unique  |
| `createdAt` | Date     | When the token was blacklisted        | Auto-expires (24h)|

## Authentication
- JWT-based authentication
- Token blacklisting for logout
- Protected routes using auth middleware

## Error Handling
The API uses standard HTTP status codes and returns JSON responses with error messages when appropriate.

## Directory Structure
- `controllers/` - Request handlers
- `models/` - Database schemas
- `routes/` - API routes
- `middlewares/` - Custom middleware functions
- `services/` - Business logic
- `db/` - Database connection
