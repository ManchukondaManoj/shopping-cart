const { Router } = require("express");
const authorization = require("../../middleware/authMiddleWare.js");
const validateRequest = require("../../middleware/validateUserRequest.js");
const orderSchema = require("../../validationSchema/orderCheckoutSchema.js");
const router = Router();

const checkout = require("./checkout.js");

router.use(authorization);
router.post("/", validateRequest(orderSchema), checkout);

module.exports = router;
