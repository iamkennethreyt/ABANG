const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const AdvertisementSchema = new Schema({
  advertisement: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = Advertisement = mongoose.model(
  "advertisements",
  AdvertisementSchema
);
