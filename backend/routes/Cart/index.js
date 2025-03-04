const { Router } = require("express");
const router = Router();

const createCart = require("./addCart.js");
const getCart = require("./getCart.js");

router.get("/", createCart);
router.get("/:id", getCart);

module.exports = router;
