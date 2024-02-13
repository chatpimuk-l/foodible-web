import Joi from "joi";
import validate from "../../../utils/validate";

const registerSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "NAME is required",
    "any.required": "NAME is required",
  }),
  email: Joi.string().required().trim().email({ tlds: false }).messages({
    "string.empty": "EMAIL is required",
    "any.required": "EMAIL is required",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .messages({
      "string.empty": "PASSWORD is required",
      "any.required": "PASSWORD is required",
      "string.pattern.base":
        "PASSWORD must be at least 6 characters and contains only alphabet or number",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "CONFIRM PASSWORD is required",
    "any.required": "CONFIRM PASSWORD is required",
    "any.only": "PASSWORD and CONFIRM PASSWORD must be matched",
  }),
}).unknown(true);

const validateRegister = (input) => validate(registerSchema)(input);

export default validateRegister;
