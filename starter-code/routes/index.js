const express = require('express');
const passportRouter = express.Router();

const User = require("../models/user")

const bcrypt = require('bcrypt');
const passport = require('passport');

const ensureLogin = require("connect-ensure-login");
const mongoose     = require('mongoose');

/* GET home page */
passportRouter.get('/', (req, res, next) => {
  res.render('index');
});

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}))

module.exports = router;
