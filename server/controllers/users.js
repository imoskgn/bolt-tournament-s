let express = require("express");
const bcrypt = require("bcrypt");
let router = express.Router();
let mongoose = require("mongoose");
let User = require("../models/user");
const { json } = require("express");
const { use } = require("../routes/user");
const jwt = require('jsonwebtoken')

/* GET User list */
module.exports.displayUserList = (req, res, next) => {
  User.find().exec((err, userList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(userList);
    }
  });
};

/* GET User by phoneNumber */
module.exports.displayUser = (req, res, next) => {
  let id = req.params.id;
  User.find({ phoneNumber: id }).exec((err, user) => {
    if (err) {
      return console.error(err);
    } else {
      res.json(user);
    }
  });
};

/* CREATE User */
module.exports.createNewUser = async (req, res, next) => {
  let user = await findUserByPhone(req.body.phoneNumber);

  if (user !== null) {
    //   if phone number exists
    res
      .status(201)
      .send({ success: false, msg: "Phone number already exists." });
  } else {
    // if it does not exists, create a new user
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      let newUser = User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: "",
        registerAt: "1999-01-01",
        password: hashedPassword,
      });

      // Add new User to the Database
      User.create(newUser, (err, Order) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.json({
            success: true,
            msg: "New User Successfully Created",
            newUser: newUser,
          });
          res.status(201).send();
        }
      });
    } catch {
      res.status(500).send();
    }
  }
};

/* UPDATE User by Id*/
module.exports.updateUser = (req, res, next) => {
  let id = req.params.id;
  updatedInfo = {
    name: req.body.name,
  };

  User.findByIdAndUpdate(id, updatedInfo, (err) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json({ success: true, msg: "User Successfully Updated" });
    }
  });
};

/* Delete user by id */
module.exports.deleteUser = (req, res, next) => {
  let id = req.params.id;
  User.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ success: true, msg: "User Successfully Deleted" });
    }
  });
};

// LOGIN user

module.exports.loginUser = async (req, res, next) => {
  // console.log(req.body.name, req.body.password, req.body.phoneNumber);
  if (
    // req.body.name != undefined &&
    req.body.password != undefined &&
    req.body.phoneNumber != undefined
  ) {
    let user = await findUserByPhone(req.body.phoneNumber);
    // console.log(user);
    if (user == null) {
      return res
        .status(400)
        .send({ success: false, msg: "User does not exist" });
    } else {
      try {
        console.log(await bcrypt.compare(req.body.password, user.password));
        if (await bcrypt.compare(req.body.password, user.password)) {
          const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);

          res.json({
            success: true,
            userInfo: user,
            accessToken: accessToken,
          });
        } else {
          res.send("not allowed");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send();
      }
    }
  } else {
    res.status(400).send({ success: false, msg: "All fields are required" });
  }
};

// find user by phone number

async function findUserByPhone(phoneNumber) {
  let foundUser = await User.findOne({ phoneNumber: phoneNumber });
  return foundUser;
}
