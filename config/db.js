const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err.message);
    process.exit(1); //Exit with failure
  }
};

module.exports = connectDB;
