const express = require('express');
const passportRouter = express.Router();

const User = require("../models/user")

const bcrypt = require('bcrypt');
const passport = require('passport');

const mongoose     = require('mongoose');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* Home page */
passportRouter.get("/", (req, res, next) => {
  res.render("index");
});

passportRouter.post("/", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}))

/* Profile */
passportRouter.get("/profile", (req, res, next) => {
  res.render("profile");
});

/* Profile */
passportRouter.get("/signup", (req,res,next) => {
  res.render("signup");
})

passportRouter.post('/signup', (req, res, next) => {

  const {
    username,
    password
  } = req.body;

  User.findOne({
    username
  })
  .then(user => {
    if (user !== null){
      throw new error("Username already Exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User ({
      username,
      password: hashPass,
    });

    return newUser.save()

  })
    .then (user => {
      res.redirect("/profile");
    })
    .catch(err => {
      res.render("/signup"), {
        errorMessage: err.message
      }
    })
}) 

passportRouter.get("/logout", ensureLoggedIn("/"), (req, res) => {
  req.logout();
  res.redirect("/");
});


module.exports = passportRouter;
