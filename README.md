# Whispr - Real-time Chat Application

**Whispr** is a real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It features live messaging using Socket.IO and secure user authentication via JWT (JSON Web Tokens).

---
## ✅ Server Features Completed So Far

- **Server setup**
  - Initialized Express app with essential middleware in app.js: body parsing, cookie parsing, CORS setup, and file  upload handling
  - Connected MongoDB with Mongoose (`db.js`)
  - Configured environment variables using `dotenv` in `/server/config/config.env`
  - Defined entry point `server.js`

- **Folder structure**
  - Created clean modular directories: `/controllers`, `/routes`, `/models`, `/middlewares`, `/utils`, `/config`, `/database`, `/temp`

- **Middleware**
  - `catchAsyncError`: wraps async functions to handle errors cleanly
  - `auth.middleware.js`: verifies JWT from cookies and protects private routes

- **Models**
  - `user.model.js`: defines fullName, email, password, avatar, timestamps
  - `message.model.js`: defines sender, receiver, message text, timestamps

- **Utilities**
  - `generateJWTToken` (in `jwtToken.js`): creates JWT token and sets it as HTTP-only cookie

- **Cloudinary & file upload**
  - Configured `cloudinary` using env variables
  - Set up `express-fileupload` to handle multipart uploads
  - Integrated avatar upload with Cloudinary

- **User routes (`/routes/user.routes.js`)**
  - Created routing structure before controller logic
  - Includes paths for signup, signin, logout, get user, update profile

- **User controller (`/controllers/user.controller.js`)**
  - `signup`: handles user registration and token issuance
  - `signin`: handles login validation and token issuance
  - `signout`: clears cookie to log out user
  - `getuser`: fetches authenticated user's profile
  - `updateProfile`: updates profile fields and avatar via Cloudinary

- **Message routes (`/routes/message.routes.js`)**
  - Created routing structure before controller logic
  - Includes paths for get all users, fetch messages, and send a message

- **Message controller (`/controllers/message.controller.js)**
  - `getAllUsers`: fetches all users except the current user
  - `getMessages`: retrieves message history between the current user and selected user
  - `sendMessage`: handles sending a new message to a specific user

- **Socket.IO integration (`/utils/socket.js`)**
  - Maps connected users with `userSocketMap` for tracking online users
  - Emits `getOnlineUsers` on connect/disconnect to broadcast active users
  - Emits `newMessage` to the receiver if online during message delivery


---

## ✅ Client (Frontend) Features Completd So far

- **Vite + React Initialization**
  - Initialized React app using [Vite](https://vitejs.dev/) inside `/client` folder
  - Installed essential packages including: `axios`, `react-router-dom`, `react-redux`, `redux`, `socket.io-client`, `lucide-react`, `react-toastify`

- **Project Structure**
  - Setup folders for components, pages, redux slices, and utilities

- **Axios configuration (`/lib/axios.js`)**
  - Configured `axiosInstance` with dynamic `baseURL` based on environment
  - Enabled `withCredentials` to send cookies with requests

- **Socket.IO client setup (`/lib/socket.js`)**
  - Initialized Socket.IO client connection using `userId` query
  - Shared connection instance across the app
  - Functions to connect, disconnect, and access socket instance

- **Redux store (`/store/store.js`)**
  - Configured Redux store using `configureStore`
  - Integrated `authSlice` to manage user state and online users

- **Auth state management (`/store/slices/authSlice.js`)**
  - Created Redux slice to manage:
    - `authUser` object
    - `isCheckingAuth` for initial auth loading
    - `onlineUsers` list
  - Used `createAsyncThunk` to fetch authenticated user from `/user/me`
  - Connected socket after successful authentication

- **App initialization (`main.jsx` & `App.jsx`)**
  - Wrapped app in `<Provider>` to enable global Redux access
  - Setup route-based rendering using `react-router-dom`
  - Protected routes using conditional rendering based on `authUser`
  - Defined routes for: `/`, `/login`, `/register`, `/profile`

---

## Tech Stack

| Layer                | Technology Used                         |
|----------------------|------------------------------------------|
| Frontend             | React.js (with Vite)                     |
| Backend              | Node.js, Express.js                      |
| Authentication       | JWT, cookie-based authentication         |
| Database             | MongoDB with Mongoose ORM                |
| Real-time Messaging  | Socket.IO                                |
| File Upload Handling | express-fileupload with Cloudinary       |


---

## Folder Structure

```text
/whispr
├── /client                  → React frontend (Vite)
│   ├── /public              → Static assets
│   ├── /src
│   │   ├── /components      → Reusable UI components
│   │   ├── /pages           → Page-level components (Login, Chat, etc.)
│   │   ├── /redux           → Redux slices & store configuration
│   │   ├── /utils           → Helper functions (e.g. API handlers)
│   │   ├── App.jsx          → Root component
│   │   └── main.jsx         → Entry point for React + Vite
│   └── vite.config.js       → Vite configuration
│
├── /server
│   ├── /config              → Environment and DB configuration
│   │   └── config.env
│   ├── /controllers         → Route controller functions
│   │   ├── user.controller.js
│   │   └── message.controller.js
│   ├── /database            → Database connection file
│   │   └── db.js
│   ├── /middlewares         → Custom middleware (e.g., error handling, auth)
│   │   ├── catchAsyncError.js
│   │   └── auth.middleware.js
│   ├── /models              → Mongoose schema definitions
│   │   ├── user.model.js
│   │   └── message.model.js
│   ├── /routes              → REST API route handlers
│   │   ├── user.routes.js
│   │   └── message.routes.js
│   ├── /utils               → Utility functions (e.g., JWT, Socket.IO)
│   │   ├── jwtToken.js
│   │   └── socket.js
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


##  How to Run the Client

Follow these steps to get the frontend client running locally:

1. Navigate to the client directory (if not already):

    ```bash
    cd whispr/client
    ```

2. Install client dependencies:

    ```bash
    npm install
    ```

3. Start the development server using Vite:

    ```bash
    npm run dev
    ```

4. Open the app in your browser:

    ```
    http://localhost:5173
    ```

> Ensure your backend server is running and the `FRONTEND_URL` is set properly in `server/config/config.env`.

    
