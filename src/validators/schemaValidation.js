const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
 

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  phone: Joi.string().min(10).max(15).pattern(/^\d+$/).required(),
});



module.exports = {
  loginSchema,
  registerSchema,
 
};
