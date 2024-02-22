import Joi from "joi";
import validate from "../../../utils/validate";

const userProfileSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]{3,}$/)
    .trim()
    .messages({
      "string.empty": "NAME is required",
      "any.required": "NAME is required",
      "string.pattern.base":
        "PASSWORD must be at least 3 characters and contains only alphabet",
    }),
}).unknown(true);

const validateUserProfile = (input) => validate(userProfileSchema)(input);

export default validateUserProfile;
