const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

const app = express();

//Connect to db
connectDB();

app.use(cors());
app.use(express.json({ extended: false })); //Accept json into our API

//Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

var server_port = process.env.PORT || 9000;

if (process.env.NODE_ENV !== "test") {
  app.listen(server_port, "0.0.0.0", () =>
    console.log(`Server running on ${server_port}`)
  );
}

module.exports = app;
