const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const videoHandler = require("./routeHandler/videoHandler");
const mongoose = require("mongoose");
const userHandler = require("./routeHandler/userHandler");
const HistoryHandler = require("./routeHandler/historyHandler");
const Statics = require("./routeHandler/statics");
const LikedVideos = require("./routeHandler/likeHandler");
const port = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001", // Adjust this to your client-side origin
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  // Handle custom events here

  socket.emit("hello", "hello test");

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const count = io.engine.clientsCount;
// may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
const count2 = io.of("/").sockets.size;
console.log(count2);

mongoose
  .connect(process.env.CON_STR)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use("/history", HistoryHandler);
app.use("/videos", videoHandler);
app.use("/users", userHandler);
app.use("/statics", Statics);
app.use("/likes", LikedVideos);

//route route
app.get("/", (req, res) => {
  res.send("hello");
});

httpServer.listen(port, () => {
  console.log("server start ");
});
