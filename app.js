require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");

const app = express();

//ejs environment
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.get("/", (req, res) => {res.render("home");});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
