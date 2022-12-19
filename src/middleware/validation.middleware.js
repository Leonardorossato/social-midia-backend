const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(3).max(250).required(),
    email: Joi.string().email().min(3).max(200).required(),
    password: passwordComplexity(),
  });
  return schema.validate(user);
};

const validatePosts = (posts) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });
  return schema.validate(posts);
};

module.exports = { validateUser, validatePosts };
