var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
const user = require("../models/user");

// Create the user model instance
let userModel = require("../models/user");
let User = userModel.User; // Alias

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", { title: "Home", displayName:req.user ? req.user.displayName : ''});
};
module.exports.displayAboutPage = (req, res, next) => {
  res.render("index", { title: "About", displayName:req.user ? req.user.displayName : ''});
};
module.exports.displayProjectsPage = (req, res, next) => {
  res.render("index", { title: "Projects", displayName:req.user ? req.user.displayName : ''});
};
module.exports.displayServicesPage = (req, res, next) => {
  res.render("index", { title: "Services", displayName:req.user ? req.user.displayName : ''});
};
module.exports.displayContactPage = (req, res, next) => {
  res.render("index", { title: "Contact Me", displayName:req.user ? req.user.displayName : ''});
};

// Login and Registration
module.exports.displayLoginPage = (req, res, next) => {
  // Check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : '',
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("logingMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/contact-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register",
      {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : '',
      });
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // Instantiate a user obj
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting new user");
      if ((err.name = "UserExistError")) {
        req.flash("registerMessage", "Registration Error: User already exist.");
        console.log("Error: User already exist");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : '',
      });
    } else {
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/contact-list");
      });
    }
  });
};

module.exports.processLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
  };
  