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
var server_host = "0.0.0.0";

app.listen(server_port, server_host, () =>
  console.log(`Server running on ${server_port}`)
);
