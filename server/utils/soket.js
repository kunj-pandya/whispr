import { Server } from "socket.io";

// In-memory map to store connected users: userId → socket.id
const userSocketMap = {};

let io;

// Initializes the Socket.IO server with CORS config
export function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: [process.env.FRONTEND_URL],
        },
    });

    // On new socket connection
    io.on("connection", (socket) => {
        console.log("A user connected to the server", socket.id);

        // Extract user ID from query params
        const userId = socket.handshake.query.userID;

        // Map user ID to socket ID
        if (userId) userSocketMap[userId] = socket.id;

        // Notify all clients about the current online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // On disconnect, remove user and broadcast updated online list
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
}

// Get a socket ID using user ID (used to emit messages)
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// Export io instance to be used across files
export { io };
