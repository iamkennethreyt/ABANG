const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

// Advertisement model
const Property = require("../../models/Property");

// Validation
const AddProperty = require("../../validations/ValidatePropertyInput/AddProperty");
const PhoneNumberInput = require("../../validations/ValidatePropertyInput/PhoneNumberInput");

const myReturn = props => {
  const {
    coordinates,
    _id,
    user,
    name,
    type,
    completeaddress,
    contactinfo,
    feedbacks,
    contactNumber,
    ratings
  } = props;

  return {
    coordinates,
    _id,
    user,
    name,
    type,
    completeaddress,
    contactinfo,
    feedbacks,
    contactNumber,
    aveRatings: _.round(_.meanBy(ratings, o => o.rating)),
    feedbacksLength: feedbacks.length
  };
};

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
      contactNumber: req.body.contactnumber,
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
      if (
        _.find(prop.contactinfo, {
          phonenumber: req.body.phonenumber
        })
      ) {
        return res
          .status(400)
          .json({ phonenumber: "This phone number is already exist" });
      }

      const contactinfo = {
        phonenumber: req.body.phonenumber,
        network: req.body.network
      };

      Property.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { contactinfo } },
        { new: true }
      )
        .populate("feedbacks.user", "name")
        .then(newProf => {
          res.json(myReturn(newProf));
        });
    });
  }
);

//@route    DELETE api/properties/phonenumber
//@desc     delete phone number of property based on params
//@access   private
router.delete(
  "/phonenumber/:id/:_id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Property.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { contactinfo: { _id: req.params._id } } },
      { new: true }
    )
      .populate("feedbacks.user", "name")
      .then(props => res.json(myReturn(props)))
      .catch(err => res.status(400).json(err));
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
      .then(props => res.json(props.map(x => myReturn(x))))
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
      .populate("feedbacks.user", "name")
      .then(props => res.json(myReturn(props)))
      .catch(() => res.status(404).json({ property: "No properties found" }));
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
      .populate("feedbacks.user", "name")
      .then(props => res.json(props.map(x => myReturn(x))))
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
      .then(props => res.json(props.map(x => myReturn(x))))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

// @route   PUT api/properties/rating/:id
// @desc    Add ratings to the properties
// @access  Private
router.put(
  "/rating/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (_.isEmpty(req.body.rating)) {
      return res.status(400).json({ rating: "rating is required" });
    }

    Property.findById(req.params.id).then(prop => {
      if (!prop) {
        return res.status(400).json({ property: "property params not found" });
      }

      const newRating = {
        user: req.user.id,
        rating: req.body.rating
      };

      const found = prop.ratings.find(o => {
        return o.user == req.user.id;
      });

      if (!found) {
        prop.ratings.unshift(newRating);
        prop.save().then(prop => res.json(prop));
      } else {
        Property.findOneAndUpdate(
          { _id: req.params.id, "ratings.user": req.user.id },
          { $set: { "ratings.$.rating": req.body.rating } },
          { new: true }
        )
          .populate("feedbacks.user", "name")
          .then(newProf => {
            res.json(myReturn(newProf));
          });
      }
    });
  }
);

// @route   PUT api/properties/feedback/:id
// @desc    Add feedback
// @access  Private
router.put(
  "/feedback/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (_.isEmpty(req.body.feedback)) {
      return res.status(400).json({ feedback: "feedback field is required" });
    }

    Property.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          feedbacks: { feedback: req.body.feedback, user: req.user.id },
          $sort: { date: -1 }
        }
      },
      { new: true }
    )
      .populate("feedbacks.user", "name")
      .then(newProf => {
        res.json(myReturn(newProf));
      });
  }
);

// @route POST /upload
// @desc  send email to admin
const transporter = require("../../config/key").transporter;

router.post(
  "/sendemailtoadmin",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { email, message } = req.body;
    const mailOptions = {
      from: req.body.email,
      to: "dadaxxx15@gmail.com",
      subject: "Message from your ABANG Mobile App",
      text: `you have a new email from ${req.body.email},

            ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        res.json({ success: info.response });
      }
    });
  }
);
module.exports = router;
