const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const _ = require("lodash");
const key = require("../../config/key").secretOrkey;

//load validation
const SignInInput = require("../../validations/ValidateUserInput/SignInInput");
const SignUpInput = require("../../validations/ValidateUserInput/SignUpInput");

//load User model
const User = require("../../models/User");

//@route    POST /api/users/signup
//@desc     Sign up new user
//@access   public
router.post("/signup", (req, res) => {
  const { errors, isValid } = SignUpInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUSer = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        completeaddress: req.body.completeaddress,
        type: req.body.type
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt, (err, hash) => {
          if (err) throw err;
          newUSer.password = hash;
          newUSer
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
});

//@route    POST api/users/signin
//@desc     Sign in user and returns  JWT web token
//@access   public
router.post("/signin", (req, res) => {
  const { errors, isValid } = SignInInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find User by Email
  User.findOne({ email: req.body.email }).then(user => {
    //check user
    if (!user) {
      errors.email = "Email not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        //user  matched

        //create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        //sign token
        jwt.sign(payload, key, (err, token) => {
          if (err) throw err;

          res.json({
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
