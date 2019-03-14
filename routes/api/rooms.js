const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");

const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");

const AddRoom = require("../../validations/ValidateRoomInput/AddRoom");

const mongoURI = "mongodb://localhost:27017/abang";

const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const Room = require("../../models/Room");
const Property = require("../../models/Property");
const User = require("../../models/User");

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

const myReturn = param => {
  const {
    _id,
    amenities,
    name,
    type,
    date,
    price,
    property,
    details,
    roomImage
  } = param;

  return {
    _id,
    amenities,
    roomImage,
    name,
    roomtype: type,
    propname: property.name,
    proptype: property.type,
    propID: property._id,
    address: property.completeaddress,
    price,
    date,
    details,
    property,
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
  upload.single("file"),
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = AddRoom(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Property.findById(req.body.property, (err, prop) => {
      if (err) {
        return res.status(400).json({ property: "Property not found" });
      }

      const newData = new Room({
        property: req.body.property,
        name: req.body.name,
        details: req.body.details,
        price: req.body.price,
        amenities: req.body.amenities.split(","),
        roomImage: req.file.filename
      });
      upload.single("file");
      newData.save().then(room => res.json(room));
    });
  }
);

// @route   GET api/rooms
// @desc    Show all Rooms
// @access  Private
router.get("/", (req, res) => {
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
});

// @route   GET api/rooms/properties/:id
// @desc    Show all Rooms of the properties params
// @access  Private
router.get("/properties/:id", (req, res) => {
  Room.find({ property: req.params.id })
    .populate({
      path: "property",
      select: "name completeaddress ratings type contactinfo"
    })
    .sort({ date: -1 })
    .then(rooms => res.json(rooms.map(x => myReturn(x))))
    .catch(err => res.status(404).json({ property: "No properties found" }));
});

// @route   GET api/rooms/properties/:id
// @desc    Show all Rooms of the properties params
// @access  Private
router.get("/room/:id", (req, res) => {
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
        const {
          _id,
          amenities,
          name,
          type,
          date,
          price,
          property,
          roomImage
        } = rooms;

        res.json({
          _id,
          amenities,
          roomname: name,
          roomtype: type,
          propname: property.name,
          proptype: property.type,
          address: property.completeaddress,
          contactinfo: property.contactinfo,
          propertyid: property._id,
          price,
          date,
          roomImage,
          owner: user.name,
          owneremail: user.email,
          aveRatings: _.round(_.meanBy(property.ratings, o => o.rating))
        });
      });

      // res.json(myReturn(rooms));
    })
    .catch(err => res.status(404).json({ property: "No properties found" }));
});

// @route   DELETE api/rooms/:id
// @desc    Delete Single Room
router.delete("/room/:id", (req, res) => {
  Room.findByIdAndDelete(req.params.id).then(data => res.json(data));
});

// @route POST /upload
// @desc  Uploads file to DB
// router.post(
//   "/upload",
//   upload.single("file")
//   // passport.authenticate("jwt", { session: false }),

//   // (req, res) => {
//   //   const user = {};

//   //   user.image = req.file.filename;

//   //   User.findOneAndUpdate(
//   //     { _id: req.user.id },
//   //     { $set: user },
//   //     { new: true }
//   //   ).then(user => res.json(user));
//   // }
// );
// @route POST /upload
// @desc  Uploads file to DB
// router.post("/upload", upload.single("file"), (req, res) => {
//   // res.json({ file: req.file });
//   res.redirect("/");
// });

// @route GET /image/:filename
// @desc Display Image
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

module.exports = router;
