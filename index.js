const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const path = require("path");

const app = express();

//Connect to db
connectDB();

app.use(cors());
app.use(express.json({ extended: false })); //Accept json into our API
app.use(express.static(path.join(__dirname, "client", "build")));

//Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT || 9000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
