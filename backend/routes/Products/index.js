const { Router } = require("express");
const authorization = require("../../middleware/authMiddleWare.js");
const router = Router();

const getProducts = require("./getProducts.js");
const getProductById = require("./getProductById.js");
const addProduct = require("./addProduct");
const updateProduct = require("./updateProduct");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.use(authorization);
router.post("/", addProduct);
router.put("/", updateProduct);
module.exports = router;
