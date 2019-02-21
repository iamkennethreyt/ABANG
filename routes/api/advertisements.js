const express = require("express");
const _ = require("lodash");

const router = express.Router();
//load User model
const Advertisement = require("../../models/Advertisement");

//@route    POST /api/advertisements
//@desc     Add advertisment
//@access   public
router.post("/", (req, res) => {
  if (_.isEmpty(req.body.advertisement)) {
    res.status(400).json({ advertisement: "advertisement field is required" });
  }

  if (_.isEmpty(req.body.link)) {
    res.status(400).json({ link: "link field is required" });
  }

  Advertisement.findOne({ advertisement: req.body.advertisement }).then(add => {
    if (add) {
      return res.status(400).json(errors);
    } else {
      const newAdd = new Advertisement({
        advertisement: req.body.advertisement,
        link: req.body.link
      });

      newAdd.save().then(ad => res.json(ad));
    }
  });
});

//@route    GET api/advertisements/
//@desc     Show all advertisements
//@access   private
router.get("/", (req, res) => {
  const errors = {};
  Advertisement.find()
    .then(ad => {
      if (!ad) {
        return res.status(404).json(errors);
      }
      res.json(ad);
    })
    .catch(err => res.status(404).json(errors));
});

//@route    DELETE api/advertisements/:id
//@desc     Remove single advertisements based on the params id
//@access   private
router.delete("/:id", (req, res) => {
  const errors = {};

  Advertisement.findOneAndDelete({ _id: req.params.id })
    .then(rmv => res.json(rmv))
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
