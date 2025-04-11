# Auth App - MERN Authentication Project

A complete authentication system built with MongoDB, Express, Node.js, and EJS templates, styled with Tailwind CSS.

---

## Project Overview

This is a simple but robust authentication application that follows the MVC (Model-View-Controller) architecture. It provides user registration, login/logout functionality, and a protected dashboard page.

---

## Features

- User registration with password hashing
- User login with JWT authentication
- Protected routes
- Flash messages for user feedback
- Responsive design with Tailwind CSS

---
## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

---

## Setup Instructions

1. **Clone the repository**  
    ```bash
    git clone <repository-url>
    cd tictactoe25
    ```

2. **Install dependencies**  
    ```bash
    npm install
    ```

3. **Environment Variables**  
    Create a `.env` file in the root directory with the following variables:  
    ```
    PORT=3000
    MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
    JWT_SECRET=your_jwt_secret
    ```

    Replace `mongodb+srv://username:password@cluster.mongodb.net/database` with your actual MongoDB connection string.

4. **Build Tailwind CSS**  
    ```bash
    npx tailwindcss -i ./src/input.css -o ./public/output.css --watch
    ```

5. **Start the development server**  
    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Routes

### Public Routes

| Method | Route      | Description               |
|--------|------------|---------------------------|
| GET    | `/`        | Home page                |
| GET    | `/register`| User registration page   |
| POST   | `/register`| Register a new user      |
| GET    | `/login`   | User login page          |
| POST   | `/login`   | Authenticate user        |
| GET    | `/logout`  | Log out authenticated user|

### Protected Routes

| Method | Route       | Description                     |
|--------|-------------|---------------------------------|
| GET    | `/dashboard`| User dashboard (requires authentication) |

---

## Testing the Application

### Manual Testing

#### Registration
1. Navigate to `/register`.
2. Fill in the registration form with your details.  
    - Password must be at least 6 characters long.
3. Submit the form.  
    - You should be redirected to the login page with a success message.

#### Login
1. Navigate to `/login`.
2. Enter your registered email and password.
3. Submit the form.  
    - You should be redirected to the dashboard.

#### Dashboard Access
- After logging in, you can access `/dashboard`.  
  - The dashboard displays your user information.
- If you try to access the dashboard without logging in, you'll be redirected to the login page.

#### Logout
- Click on the "Logout" link in the header or dashboard.  
  - You should be redirected to the login page.

### Using API Clients (Postman, Insomnia, etc.)

#### Register a user
- **POST** `/register`  
  **Body:**  
  ```json
  {
     "email": "example@example.com",
     "password": "password123"
  }
  ```

#### Login
- **POST** `/login`  
  **Body:**  
  ```json
  {
     "email": "example@example.com",
     "password": "password123"
  }
  ```
  - The response will set a cookie with the JWT token.

#### Access Dashboard
- **GET** `/dashboard`  
  - Include the cookie with the JWT token.

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Template Engine:** EJS
- **Authentication:** JWT (JSON Web Tokens)
- **CSS Framework:** Tailwind CSS
- **Development:** Nodemon for auto-reloading

---

## Dependencies

### Main Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `ejs` - Template engine
- `express-ejs-layouts` - Layout support for EJS
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT implementation
- `connect-flash` - Flash messages
- `express-session` - Session management
- `cookie-parser` - Cookie parsing
- `dotenv` - Environment variables
- `morgan` - HTTP request logger

### Development Dependencies
- `nodemon` - Auto-reloading during development
- `tailwindcss` - Utility-first CSS framework
- `postcss` - CSS transformation tool
- `autoprefixer` - Vendor prefixing for CSS

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License.

---
