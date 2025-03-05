const { Router } = require("express");
const authorization = require("../../middleware/authMiddleWare.js");

const router = Router();

const checkout = require("./checkout.js");

router.use(authorization);
router.post("/", checkout);

module.exports = router;
