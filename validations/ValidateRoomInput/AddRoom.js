const validator = require("validator");
const _ = require("lodash");

module.exports = function AddRoom(data) {
  let errors = {};

  data.property = !_.isEmpty(data.property) ? data.property : "";
  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.type = !_.isEmpty(data.type) ? data.type : "";
  data.details = !_.isEmpty(data.details) ? data.details : "";
  data.price = !_.isEmpty(data.price) ? data.price : "";
  data.amenities = !_.isEmpty(data.amenities) ? data.amenities : "";

  if (_.isEmpty(data.price)) {
    errors.price = "price field is required";
  }

  if (!validator.isNumeric(data.price)) {
    errors.price = "price must be numeric";
  }

  if (!validator.isLength(data.details, { min: 4, max: 40 })) {
    errors.details = "details must be 4 to 40 characters";
  }

  if (_.isEmpty(data.details)) {
    errors.details = "details field is required";
  }

  if (_.isEmpty(data.property)) {
    errors.property = "Property field is required";
  }

  if (!validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Name must be 4 to 40 characters";
  }

  if (_.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (_.isEmpty(data.type)) {
    errors.type = "Room type field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
