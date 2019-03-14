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
  contactNumber: {
    type: String
  },
  contactinfo: [
    {
      phonenumber: {
        type: String
      },
      network: {
        type: String
      }
    }
  ],

  books: [
    {
      room: {
        type: Schema.Types.ObjectId,
        ref: "rooms",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phonenumber: {
        type: String,
        required: true
      },
      details: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
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
