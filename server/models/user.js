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
    register: Boolean
}
);

module.exports = mongoose.model('user', User); //(Model, Object)
