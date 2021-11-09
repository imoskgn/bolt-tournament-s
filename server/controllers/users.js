let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/user');


/* GET User list */
module.exports.displayUserList = (req, res, next) => {
    User.find().exec((err, userList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(userList);
        }
    });
};

/* GET User by Id */
module.exports.displayUser = (req, res, next) => {
    let id = req.params.id 
    User.findById(id).exec((err, user) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(user);
        }
    });
};

/* CREATE User */
module.exports.createNewUser = (req, res, next) => {
    let newUser = User({
        "name": req.body.name,
        "phoneNumber": req.body.phoneNumber,
        "registered": false,
        "email": "",
        "registerAt": "1999-01-01",
        "password": ""
    });

    // Add new User to the Database
    User.create(newUser, (err, Order) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({ success: true, msg: 'New User Successfully Created' });
        }
    });
}

/* UPDATE User by Id*/
module.exports.updateUser = (req, res, next) => {
    let id = req.params.id
    updatedInfo = {
        "name": req.body.name
    }

    User.findByIdAndUpdate(id, updatedInfo, (err) => {
        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            res.json({ success: true, msg: 'User Successfully Updated' });
        }
    })
}



/* Delete user by id */
module.exports.deleteUser = (req, res, next) => {
    let id = req.params.id;
    User.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.json({ success: true, msg: 'User Successfully Deleted' });
        }
    })
}
