const express = require("express");
const router = express.Router();


// Define routes
router.get("/verifyotptest", (req, res) => {
    if (req.isAuthenticated()) {
        console.log(gtotp);
        res.render("verifyotp");
    } else {
        res.redirect("/signup");
    }
    
});

router.post("/homepage", async (req, res) => {
    if (req.isAuthenticated()) {
        const ug = req.user;
        if (gtotp == req.body.otpverify) {
            await User.findOneAndUpdate(
                { _id: ug._id },
                {
                    verifed: true,
                },
                { new: true }
            );
            res.redirect("/home");
        } else {
            await User.findByIdAndDelete({ _id: ug._id });
            res.redirect("/signup");
        }
    } else {
        res.redirect("/signup");
    }
});

module.exports = router;
