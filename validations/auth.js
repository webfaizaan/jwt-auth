const Joi = require("joi");

const register = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),

    email: Joi.string().required().email().max(320),

    password: Joi.string().required().min(6),
  });

  return schema.validateAsync(data);
};

const login = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().max(320),

    password: Joi.string().required().min(6),
  });

  return schema.validateAsync(data);
};

module.exports = { register, login };
