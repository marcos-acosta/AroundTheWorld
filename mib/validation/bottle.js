const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateBottleInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.prompt = !isEmpty(data.prompt) ? data.prompt : "";
  data.destination = !isEmpty(data.destination) ? data.destination : "";
  // Prompt checks
  if (Validator.isEmpty(data.prompt)) {
    errors.prompt = "Email field is required";
  }
  // Destination checks -- UPDATE LATER
  if (Validator.isEmpty(data.destination)) {
    errors.destination = "Destination field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};