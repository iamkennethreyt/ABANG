const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  details: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
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
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
