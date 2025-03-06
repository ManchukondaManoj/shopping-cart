const { Router } = require("express");
const authorization = require("../../middleware/authMiddleWare.js");
const validateRequest = require("../../middleware/validateUserRequest.js");
const {
  productSchema,
  updateProductSchema,
} = require("../../validationSchema/productSchema.js");

const router = Router();

const getProducts = require("./getProducts.js");
const getProductById = require("./getProductById.js");
const addProduct = require("./addProduct.js");
const updateProduct = require("./updateProduct.js");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.use(authorization);
router.post("/", validateRequest(productSchema), addProduct);
router.put("/", validateRequest(updateProductSchema), updateProduct);
module.exports = router;
