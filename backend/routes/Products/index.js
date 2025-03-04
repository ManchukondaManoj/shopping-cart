const { Router } = require("express");
const router = Router();

const getProducts = require("./getProducts.js");
const getProductById = require("./getProductById.js");

router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
