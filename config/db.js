require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB connection URL
const dbURL = process.env.DATABASE_URL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB database!");
});

module.exports = db;
