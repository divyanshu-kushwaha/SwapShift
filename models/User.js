const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    mobile: {
        type: Number,
        required: true,
    },
    verifed: {
        type: Boolean,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
