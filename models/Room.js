const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: "properties",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  images: [
    {
      path: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Propery = mongoose.model("rooms", PropertySchema);
