import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Store connected users with their socket IDs
const users = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send the user their own socket ID
  socket.emit("your_id", socket.id);

  // Broadcast to all users the list of connected users
  users.set(socket.id, {
    id: socket.id,
    name: `User-${socket.id.slice(0, 4)}`,
  });
  io.emit("users_list", Array.from(users.values()));

  // Public message (broadcast to all)
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    io.emit("send_message_to_all", msg);
  });

  // Private message to specific user
  socket.on("private_message", ({ recipientId, message }) => {
    console.log(
      `Private message from ${socket.id} to ${recipientId}: ${message}`
    );

    // Send to the recipient
    io.to(recipientId).emit("receive_private_message", {
      from: socket.id,
      message: message,
    });

    // Send confirmation back to sender
    socket.emit("private_message_sent", {
      to: recipientId,
      message: message,
    });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("show_typing_status");
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("hide_typing_status");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    users.delete(socket.id);
    io.emit("users_list", Array.from(users.values()));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
