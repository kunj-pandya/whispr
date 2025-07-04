# Whispr - Real-time Chat Application

Whispr is a real-time chat application built using the **MERN stack** (MongoDB, Express, React, Node.js) along with **Socket.IO** for real-time communication and **JWT-based authentication**.

---


- Express server setup with middleware
- MongoDB connection via Mongoose
- Environment configuration using `.env` (not committed)
- User registration (signup) functionality with:
  - Input validation
  - Password hashing using `bcryptjs`
  - JWT token generation with HTTP-only cookies
- User login (signin) functionality with:
  - Email and password validation
  - Secure token issuance and cookie handling
- User logout (signout) functionality with:
  - Cookie clearing and session termination
  - Get user (getUser) functionality with:
  - Returns authenticated user's profile
  - Protected using auth middleware
- Authentication middleware (`auth.middleware.js`) to protect routes
- Cloudinary + express-fileupload middleware integrated
- Organized file structure using:
  - Controllers
  - Models
  - Routes
  - Middleware (e.g., `catchAsyncError`, `auth.middleware`)
---

## Tech Stack

| Layer          | Technology Used                         |
|----------------|------------------------------------------|
| Backend        | Node.js, Express.js                      |
| Authentication | JWT, cookie-based authentication         |
| Database       | MongoDB with Mongoose ORM                |
| Real-time      | Socket.IO                                |
| File Uploads   | express-fileupload with Cloudinary       |

---

## Folder Structure

```text
/whispr
├── /client                  → React frontend (coming soon)
├── /server
│   ├── /config              → Environment and DB configuration
│   │   └── config.env
│   ├── /controllers         → Route controller functions
│   │   └── user.controller.js
│   ├── /database            → Database connection file
│   │   └── db.js
│   ├── /middlewares         → Custom middleware (e.g., error handling)
│   │   └── catchAsyncError.js
│   ├── /models              → Mongoose schema definitions
│   ├── /routes              → REST API route handlers
│   │   └── user.routes.js
│   ├── /utils               → Utility functions (e.g., JWT token)
│   │   └── jwtToken.js
│   ├── /temp                → Temporary file uploads (ignored in .gitignore)
│   ├── app.js               → Express app configuration
│   └── server.js            → Server entry point
```

---

## Environment Variables

Create a `.env` file at `server/config/config.env` with the following variables:

```env
PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=5
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## How to Run the Server

Follow these steps to get the backend server running locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/kunj-pandya/whispr.git
    cd whispr/server
    ```

2. Install server dependencies:

    ```bash
    npm install
    ```

3. Create the environment config file:

    ```bash
    mkdir config
    touch config/config.env
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```
