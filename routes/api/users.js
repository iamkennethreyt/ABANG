const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const _ = require("lodash");

const key = require("../../config/key").secretOrkey;

const router = express.Router();

//load validation
const SignInInput = require("../../validations/ValidateUserInput/SignInInput");
const SignUpInput = require("../../validations/ValidateUserInput/SignUpInput");
const PhoneNumberInput = require("../../validations/ValidateUserInput/PhoneNumberInput");

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

//@route    GET api/users/profile
//@desc     return current user
//@access   private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

//@route    PUT api/users/settings/account
//@desc     account settings of the current logged in user
//@access   private
router.put(
  "/settings/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userFields = {};

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      }

      if (req.body.name) userFields.name = req.body.name;
      if (req.body.email) userFields.email = req.body.email;
      if (req.body.completeaddress)
        userFields.completeaddress = req.body.completeaddress;
      if (req.body.details) userFields.details = req.body.details;
      if (req.body.type) userFields.type = req.body.type;

      User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: userFields },
        { new: true }
      ).then(newProfile => res.json(newProfile));
    });
  }
);

//@route    POST api/users/phonenumber
//@desc     add phone number to the current user
//@access   private
router.post(
  "/phonenumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = PhoneNumberInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findById(req.user.id).then(user => {
      const newPN = {
        network: req.body.network,
        phonenumber: req.body.phonenumber
      };

      const findNumber = _.find(user.contactinfo, {
        phonenumber: req.body.phonenumber
      });

      if (findNumber) {
        return res
          .status(400)
          .json({ phonenumber: "This phone number is already exist" });
      }

      user.contactinfo.unshift(newPN);
      user.save().then(user => res.json(user));
    });
  }
);

//@route    DELETE api/users/phonenumber
//@desc     delete phone number to the current user
//@access   private
router.delete(
  "/phonenumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { contactinfo: { _id: req.body._id } } },
      { new: true }
    ).then(newProfile => res.json(newProfile));
  }
);

module.exports = router;
