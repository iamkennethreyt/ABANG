const nodemailer = require("nodemailer");

module.exports = {
  mongoURI: "mongodb://localhost:27017/abang",
  secretOrkey: "swulutions",
  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "abang.swuphinma@gmail.com",
      pass: "abangph2019"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
};
