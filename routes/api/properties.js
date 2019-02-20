const express = require("express");
const router = express.Router();
const passport = require("passport");

// Advertisement model
const Property = require("../../models/Property");

// Validation
const AddProperty = require("../../validations/ValidatePropertyInput/AddProperty");

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

// @route   GET api/properties
// @desc    Show all Property
// @access  Private
router.get(
  "/own",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(props => res.json(props))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

// @route   GET api/properties/:id
// @desc    Show single Property based on the parameter
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.findById(req.params.id)
      .populate("user", "name email contactinfo")
      .then(props => res.json(props))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

module.exports = router;
