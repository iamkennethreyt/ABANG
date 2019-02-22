const validator = require("validator");
const _ = require("lodash");

module.exports = function AddProperty(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.type = !_.isEmpty(data.type) ? data.type : "";
  data.lat = !_.isEmpty(data.lat) ? data.lat : "";
  data.long = !_.isEmpty(data.long) ? data.long : "";

  data.completeaddress = !_.isEmpty(data.completeaddress)
    ? data.completeaddress
    : "";

  if (!validator.isLength(data.completeaddress, { min: 4, max: 60 })) {
    errors.completeaddress = "Complete Address must be 4 to 60 characters";
  }

  if (_.isEmpty(data.completeaddress)) {
    errors.completeaddress = "Complete Address field is required";
  }

  if (!validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Name must be 4 to 40 characters";
  }

  if (_.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (_.isEmpty(data.type)) {
    errors.type = "Property type field is required";
  }

  if (!validator.isLength(data.long, { min: 4, max: 60 })) {
    errors.long = "Complete Address must be 4 to 60 characters";
  }

  if (_.isEmpty(data.long)) {
    errors.long = "Complete Address field is required";
  }

  if (!validator.isLength(data.lat, { min: 4, max: 60 })) {
    errors.lat = "Complete Address must be 4 to 60 characters";
  }

  if (_.isEmpty(data.lat)) {
    errors.lat = "Complete Address field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
