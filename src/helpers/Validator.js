import emailValidator from "email-validator";

export const Validator = {
  validName,
  validEmail,
  validPassword,
  present,
};

export default Validator;

function validName(name) {
  return name.trim().length === 0 || name.trim().length >= 2;
}

function validPassword(password) {
  return password === '' || password.length >= 6;
}

function validEmail(email) {
  return email === '' || emailValidator.validate(email);
}

function present(value) {
  return value.trim().length > 0;
}
