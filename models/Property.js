const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
  completeaddress: {
    type: String,
    required: true
  },
  coordinates: {
    lat: {
      type: String,
      required: true
    },
    long: {
      type: String,
      required: true
    }
  },
  feedbacks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
      feedback: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
      rating: {
        type: Number
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

module.exports = Property = mongoose.model("properties", PropertySchema);
