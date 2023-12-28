import Joi from "joi";
export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().min(6).required(),
});
