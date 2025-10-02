// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("chat message", (data) => {
    console.log(`[${data.time}] ${data.user}: ${data.msg}`);
    io.emit("chat message", data); // broadcast to everyone
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start server
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
