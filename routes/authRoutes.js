const express = require('express')
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/user")
const router = express.Router()

router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login", (req,res)=>{
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.render("home");
            });
        }
    });
})
router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
router.get("/register", (req, res) => {
    res.render("register");
});

module.exports = router;