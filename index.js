const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const videoHandler = require("./routeHandler/videoHandler");
const mongoose = require("mongoose");
const userHandler = require("./routeHandler/userHandler");
const HistoryHandler = require("./routeHandler/historyHandler");
const Statics = require("./routeHandler/statics");
const LikedVideos = require("./routeHandler/likeHandler");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.CON_STR)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use("/history", HistoryHandler);
app.use("/videos", videoHandler);
app.use("/users", userHandler);
app.use("/statics", Statics);
app.use("/like", LikedVideos);

//route route
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server started on port`);
});
