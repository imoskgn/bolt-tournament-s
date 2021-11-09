let mongoose = require("mongoose");
let passportLocalMongoos = require('passport-local-mongoose');

// Create model class
let User = mongoose.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "username is required"
    },
    /*password: {
        type: String,
        default: "",
        trim: true,
        required: "password is required"
    }, */
    email: {
        type: String,
        default: "",
        trim: true,
        required: "email address is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "Display name is required"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection:'users'
});

// Configure options for User Model

let options = ({missingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoos, options);

module.exports.User = mongoose.model('User', User);