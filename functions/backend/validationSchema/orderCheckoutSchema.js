const Joi = require("joi");

const orderSchema = Joi.object({
  orderData: Joi.object({
    shippingAddress: Joi.object({
      address: Joi.string().trim().min(5).required(),
      city: Joi.string().trim().min(2).required(),
      postalCode: Joi.string()
        .trim()
        .pattern(/^\d{6}$/)
        .required()
        .messages({ "string.pattern.base": "Postal code must be 6 digits" }),
      country: Joi.string().trim().required(),
    }).required(),

    paymentMethod: Joi.string().trim().valid("Cash", "Card").required(),

    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().trim().required(),
          name: Joi.string().trim().min(1).required(),
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
          price: Joi.alternatives().try(
            Joi.number().positive().required(),
            Joi.string()
              .trim()
              .pattern(/^\d+(\.\d{1,2})?$/)
              .custom((value) => parseFloat(value))
          ),
          countInStock: Joi.number().integer().min(0).required(),
          qty: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),

    totalPrice: Joi.alternatives().try(
      Joi.number().positive().required(),
      Joi.string()
        .trim()
        .pattern(/^\d+(\.\d{1,2})?$/)
        .custom((value) => parseFloat(value))
    ),
  }).required(),
});

module.exports = orderSchema;
