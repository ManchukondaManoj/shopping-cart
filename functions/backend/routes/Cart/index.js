const { Router } = require("express");
const router = Router();
const { cartSchema } = require("../../validationSchema/cartSchema.js");
const validateRequest = require("../../middleware/validateUserRequest.js");

const createCart = require("./addCart.js");
const getCart = require("./getCart.js");
const authorization = require("../../middleware/authMiddleWare.js");

router.use(authorization);
router.post("/", validateRequest(cartSchema), createCart);
router.get("/", getCart);

module.exports = router;
