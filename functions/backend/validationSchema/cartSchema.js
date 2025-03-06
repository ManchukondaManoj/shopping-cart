const Joi = require("joi");

const CartItemSchema = Joi.object({
  product: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string()
    .trim()
    .custom((value, helpers) => {
      // Allow URLs or file paths (starting with / or ./ or ../)
      const urlPattern = /^(https?:\/\/[^\s]+)$/;
      const pathPattern = /^(\.?\.?\/[^\s]+)$/;

      if (urlPattern.test(value) || pathPattern.test(value)) {
        return value.trim(); // Return trimmed value if valid
      }
      return helpers.error("any.invalid", {
        message: "Invalid image path or URL",
      });
    })
    .required(),
  price: Joi.number().positive().required(),
  countInStock: Joi.number().integer().min(0).required(),
  qty: Joi.alternatives()
    .try(
      Joi.number().integer().min(1), // Accepts integer numbers
      Joi.string()
        .trim()
        .pattern(/^\d+$/)
        .custom((value) => parseInt(value, 10)) // Converts string qty to integer
    )
    .required(),
});

const cartSchema = Joi.object({
  cart: Joi.array().items(CartItemSchema).min(0).required(),
});

module.exports = {
  cartSchema,
};
