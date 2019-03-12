const validator = require("validator");
const _ = require("lodash");

module.exports = function SignUpInput(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.type = !_.isEmpty(data.type) ? data.type : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : "";

  if (!_.isEqual(data.password2, data.password)) {
    errors.password2 = "password must match";
  }

  if (!validator.isLength(data.password2, { min: 4, max: 40 })) {
    errors.password2 = "Confirm Password must be 4 to 40 characters";
  }

  if (_.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.isLength(data.password, { min: 4, max: 40 })) {
    errors.password = "Password must be 4 to 40 characters";
  }

  if (_.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (_.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Name must be 4 to 40 characters";
  }

  if (_.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (_.isEmpty(data.type)) {
    errors.type = "User type field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
