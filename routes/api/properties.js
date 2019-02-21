const express = require("express");
const router = express.Router();
const passport = require("passport");

// Advertisement model
const Property = require("../../models/Property");

// Validation
const AddProperty = require("../../validations/ValidatePropertyInput/AddProperty");
const PhoneNumberInput = require("../../validations/ValidateUserInput/PhoneNumberInput");

// @route   POST /api/properties
// @desc    Create Property
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = AddProperty(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newData = new Property({
      user: req.user.id,
      name: req.body.name,
      type: req.body.type,
      completeaddress: req.body.completeaddress,
      coordinates: {
        lat: req.body.lat,
        long: req.body.long
      }
    });

    newData.save().then(prop => res.json(prop));
  }
);

//@route    POST api/properties/phonenumber
//@desc     add phone number of property based on params
//@access   private
router.post(
  "/phonenumber/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = PhoneNumberInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Property.findById(req.params.id).then(prop => {
      const newPN = {
        network: req.body.network,
        phonenumber: req.body.phonenumber
      };

      const findNumber = _.find(prop.contactinfo, {
        phonenumber: req.body.phonenumber
      });

      if (findNumber) {
        return res
          .status(400)
          .json({ phonenumber: "This phone number is already exist" });
      }

      prop.contactinfo.unshift(newPN);
      prop.save().then(prop => res.json(prop));
    });
  }
);

//@route    DELETE api/properties/phonenumber
//@desc     delete phone number of property based on params
//@access   private
router.delete(
  "/phonenumber/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { contactinfo: { _id: req.body._id } } },
      { new: true }
    ).then(newProfile => res.json(newProfile));
  }
);

// @route   GET api/properties
// @desc    Show all Property
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.find()
      .populate("user", "name email contactinfo")
      .sort({ date: -1 })
      .then(props => res.json(props))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

// @route   GET api/properties/property/:id
// @desc    Show single Property based on the parameter
// @access  Private
router.get(
  "/property/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.findById(req.params.id)
      .populate("user", "name email contactinfo")
      .then(props => res.json(props))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

// @route   GET api/properties/currentuser
// @desc    Show all the properties of the current user
// @access  Private
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(props => res.json(props))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

// @route   GET api/properties/user/:id
// @desc    Show all the properties of the user based on the params id
// @access  Private
router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.find({ user: req.params.id })
      .sort({ date: -1 })
      .then(props => res.json(props))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

module.exports = router;
