const validator = require("validator");
const _ = require("lodash");

module.exports = function PhoneNumberInput(data) {
  let errors = {};

  data.phonenumber = !_.isEmpty(data.phonenumber) ? data.phonenumber : "";
  data.network = !_.isEmpty(data.network) ? data.network : "";

  if (!validator.isLength(data.phonenumber, { min: 10, max: 15 })) {
    errors.phonenumber = "Phone Number must be 10 to 15 characters";
  }

  if (_.isEmpty(data.phonenumber)) {
    errors.phonenumber = "Phone Number field is required";
  }

  if (_.isEmpty(data.network)) {
    errors.network = "Network field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
