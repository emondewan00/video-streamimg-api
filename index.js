const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const movieHandler = require("./routeHandler/movieHandler");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(movieHandler);


app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  console.log(`Server started on port`);
});
