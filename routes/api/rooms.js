const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

const Room = require("../../models/Room");
const Property = require("../../models/Property");
const User = require("../../models/User");

const AddRoom = require("../../validations/ValidateRoomInput/AddRoom");

const myReturn = param => {
  const { _id, amenities, name, type, date, price, property } = param;

  return {
    _id,
    amenities,
    roomname: name,
    roomtype: type,
    propname: property.name,
    proptype: property.type,
    address: property.completeaddress,
    price,
    date,
    contactinfo: property.contactinfo,
    user: property.user,
    aveRatings: _.round(_.meanBy(property.ratings, o => o.rating))
  };
};

// @route   POST /api/rooms
// @desc    Create Room
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = AddRoom(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Property.findById(req.body.property, (err, prop) => {
      if (err) {
        return res.status(400).json({ property: "Property not found" });
      }

      if (prop.user != req.user.id) {
        return res
          .status(400)
          .json({ user: "This user is not able to add this property" });
      }

      const newData = new Room({
        property: req.body.property,
        name: req.body.name,
        type: req.body.type,
        details: req.body.details,
        price: req.body.price,
        amenities: req.body.amenities.split(",")
      });

      newData.save().then(room => res.json(room));
    });
  }
);

// @route   GET api/rooms
// @desc    Show all Rooms
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room.find()
      .populate({
        path: "property",
        select: "name completeaddress ratings type contactinfo user"
      })
      .sort({ date: -1 })
      .then(rooms => res.json(rooms.map(room => myReturn(room))))
      .catch(err => res.status(404).json({ property: "No properties found" }));

    // User.findById(x.property.user).then(x => {
    //   console.log(x.name);
    // });
  }
);

// @route   GET api/rooms/properties/:id
// @desc    Show all Rooms of the properties params
// @access  Private
router.get(
  "/properties/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room.find({ property: req.params.id })
      .populate({
        path: "property",
        select: "name completeaddress ratings type contactinfo"
      })
      .sort({ date: -1 })
      .then(rooms => res.json(rooms.map(x => myReturn(x))))
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

// @route   GET api/rooms/properties/:id
// @desc    Show all Rooms of the properties params
// @access  Private
router.get(
  "/room/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room.findById(req.params.id)
      .populate({
        path: "property",
        select: "name completeaddress ratings type user contactinfo"
      })
      .sort({ date: -1 })
      .then(rooms => {
        User.findById(rooms.property.user, (err, user) => {
          if (err) {
            return res.status(400).json({ err });
          }
          const { _id, amenities, name, type, date, price, property } = rooms;

          res.json({
            _id,
            amenities,
            roomname: name,
            roomtype: type,
            propname: property.name,
            proptype: property.type,
            address: property.completeaddress,
            contactinfo: property.contactinfo,
            price,
            date,
            owner: user.name,
            aveRatings: _.round(_.meanBy(property.ratings, o => o.rating))
          });
        });

        // res.json(myReturn(rooms));
      })
      .catch(err => res.status(404).json({ property: "No properties found" }));
  }
);

module.exports = router;
