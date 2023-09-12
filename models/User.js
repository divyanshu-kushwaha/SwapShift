const mongoose = require('mongoose')

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
        type: String,
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    mob: {
        type: Number,
        required: true,
    },
    verifed: {
        type: Boolean,
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;