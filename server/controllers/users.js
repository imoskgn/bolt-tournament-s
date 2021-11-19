let express = require("express");
const bcrypt = require("bcrypt");
let router = express.Router();
let mongoose = require("mongoose");
let User = require("../models/user");
const { json } = require("express");

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
    // check if user phone number already exists in the database
   User.find({ phoneNumber: req.body.phoneNumber }).exec(async (err, user) => {
    if (err) {
      return console.error(err);
    } else {
    //   res.json(user);
    console.log("user" , user , user.length)
      if(user.length !== 0){
        res.status(201).send("phone number already exists")
       
    } else {
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
                res.json({ success: true, msg: "New User Successfully Created" , newUser : newUser  });
                res.status(201).send()
              }
            });
          } catch {
             res.status(500).send()
          }
    }

    }
  });
    
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

module.exports.loginUser = async (req,res,next) => {
    console.log(req.body)
    console.log(req.body.name, req.body.password)
    if (req.body.name != undefined && req.body.password != undefined )
{
   
    const user =  User.find({ phoneNumber: req.body.phoneNumber })
    console.log(user.password)
    if(user == null){
        return res.status(400).send('Cant find the user')
    } else {
        try{
            console.log("user = " ,user)
            console.log(await bcrypt.compare(req.body.password , user.password))
           if(await bcrypt.compare(req.body.password , user.password)){
               res.send('success')
           } else {
               res.send("not allowed")
           }
        } catch(err) {
            console.log(err)
            res.status(500).send()
        }
    }
   
} else{
    res.status(400).send("require all fields")
}
}
