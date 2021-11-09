// require modules for the User model
let mongoose = require('mongoose');

let User = mongoose.Schema(
{
    name: String,
    phoneNumber: {
        type: String,
        trim: true,
        require: "phone number is require",
        unique: true
    },
    registered: Boolean,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    registerAt: Date
}
);

module.exports = mongoose.model('user', User); //(Model, Object)
