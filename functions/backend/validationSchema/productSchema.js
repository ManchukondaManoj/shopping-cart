const Joi = require("joi");

const getSchema = (edit = false) => {
  return Joi.object({
    product: Joi.object({
      ...(edit ? { productId: Joi.string().trim().required() } : {}),
      name: Joi.string().trim().min(3).required(), // Ensures name is non-empty
      image: Joi.string()
        .trim()
        .custom((value, helpers) => {
          const urlPattern = /^(https?:\/\/[^\s]+)$/; // URL format
          const pathPattern = /^(\.?\.?\/[^\s]+)$/; // File path format (e.g., "/images/...")

          if (urlPattern.test(value) || pathPattern.test(value)) {
            return value.trim(); // Return trimmed value if valid
          }
          return helpers.error("any.invalid", {
            message: "Invalid image path or URL",
          });
        })
        .required(),
      price: Joi.alternatives()
        .try(
          Joi.number().positive(),
          Joi.string()
            .trim()
            .pattern(/^\d+(\.\d+)?$/)
            .custom((value) => parseFloat(value))
        ) // Converts string price to number
        .required(),
      description: Joi.string().trim().min(10).required(), // Ensures description is at least 5 chars
      category: Joi.string().trim().required(),
      countInStock: Joi.alternatives()
        .try(
          Joi.number().integer().min(0),
          Joi.string()
            .trim()
            .pattern(/^\d+$/)
            .custom((value) => parseInt(value, 10))
        ) // Converts string countInStock to integer
        .required(),
    }).required(),
  });
};

const updateProductSchema = getSchema(true);
const productSchema = getSchema();

module.exports = {
  productSchema,
  updateProductSchema,
};
