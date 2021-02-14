const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateMessageInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.text = !isEmpty(data.text) ? data.text : "";
  // Prompt checks
  if (Validator.isEmpty(data.text)) {
    errors.prompt = "Text (message) field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};