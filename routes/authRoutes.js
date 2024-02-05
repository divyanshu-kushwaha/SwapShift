const express = require("express");
const fast2sms = require("fast-two-sms");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const User = require("../models/user");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
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
});

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res) => {
    const newUser = new User({
        name: req.body.fullName,
        mobile: req.body.mobile,
        username: req.body.username,
    });

    //using in-built register method of passport
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/auth/signup");
        } else {
            passport.authenticate("local")(req, res, function () {
                const OTP = generateOTP();
                sendOTP(OTP, req.body.mobile);
                res.redirect("/auth/verifyOTP");
            });
        }
    });
});

// Verification of Mobile Number through OTP
let theOTP = 0;
function generateOTP() {    
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    theOTP = OTP;
    return OTP;
}

function sendOTP(OTP, mobile) {
    var options = {
        authorization: process.env.FTWSMSKEY,
        sender_id: "FTWSMS",
        message: OTP,
        numbers: [mobile],
    };
    fast2sms
        .sendMessage(options)
        .then((response) => {
            console.log(response);
            console.log("OTP sent successfully.");
        })
        .catch((error) => {
            console.log(error);
        });
}

router.get("/verifyOTP", (req, res) => {
    if (req.isAuthenticated()) {
        console.log(theOTP);
        res.render("verifyOTP");
    } else {
        res.redirect("/auth/signup");
    }
});

router.post("/verifyOTP", async (req, res) => {
    if (req.isAuthenticated()) {
        const ug = req.user;
        if (theOTP == req.body.otpverify) {
            await User.findOneAndUpdate(
                { _id: ug._id },
                {
                    verifed: true,
                },
                { new: true }
            );
            res.render("home");
        } else {
            await User.findByIdAndDelete({ _id: ug._id });
            res.redirect("/auth/signup");
        }
    } else {
        res.redirect("/auth/signup");
    }
});

module.exports = router;
