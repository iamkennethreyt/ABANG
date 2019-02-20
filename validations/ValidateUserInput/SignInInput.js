const _ = require("lodash");
module.exports = function SignInInput(data) {
  let errors = {};

  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  if (_.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (_.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
