const { Router } = require("express");
const router = Router();

const createCart = require("./addCart.js");
const getCart = require("./getCart.js");
const authorization = require("../../middleware/authMiddleWare.js");

router.use(authorization);
router.post("/", createCart);
router.get("/", getCart);

module.exports = router;
