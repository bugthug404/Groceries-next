import Joi from "joi";
export const groceryItemSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required().lowercase(),
  mobile: Joi.string().required(),
  profession: Joi.string().required(),
  address: Joi.string().required(),
  role: Joi.string().required(),
});
