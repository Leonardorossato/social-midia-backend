const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(3).max(250).required(),
    email: Joi.string().email().min(3).max(250).required(),
    password: passwordComplexity(),
    picturePath: Joi.string(),
    friends: Joi.array(),
    location: Joi.string(),
    occupation: Joi.string(),
  });
  return schema.validate(user);
};

const validatePosts = (posts) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string(),
    description: Joi.string(),
    picturePath: Joi.string(),
    userPicturePath: Joi.string(),
    comment: Joi.array(),
  });
  return schema.validate(posts);
};

module.exports = { validateUser, validatePosts };
