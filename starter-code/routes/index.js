const express = require('express');
const route = express.Router();

const Band = require("../models/band")

const bcrypt = require('bcrypt');
const passport = require('passport');

const mongoose     = require('mongoose');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* Home page */
route.get("/", (req, res, next) => {
  res.render("index");
});

route.get("/login-band", (req, res, next) => {
  res.render("login");
});

route.post("/login-band", passport.authenticate("local", {
  successRedirect: "/profile-band",
  failureRedirect: "/login-band"
}))

// passportRouter.post("/", passport.authenticate("local", {
//   successRedirect: "/profile",
//   failureRedirect: "/"
// }))

/* Profile */
route.get("/profile-band", (req, res, next) => {
  res.render("profile-band", { band: req.band });
});

/* Signup */
route.get("/signup-band", (req,res,next) => {
  res.render("signup-band");
})

route.post('/signup-band', (req, res, next) => {
  const {
    name,
    password,
    contact
  } = req.body;

  Band.findOne({
    name
  })
  .then(band => {
    if (band !== null){
      throw new error("Bandname already Exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newBand = new Band ({
      name,
      password: hashPass,
      contact
    });

    return newBand.save()

  })
    .then (band => {
      res.redirect("/profile-band");
    })
    .catch(err => {
      res.render("/signup-band"), {
        errorMessage: err.message
      }
    })
}) 

route.get("/logout", ensureLoggedIn("/"), (req, res) => {
  req.logout();
  res.redirect("/");
});


module.exports = route;
