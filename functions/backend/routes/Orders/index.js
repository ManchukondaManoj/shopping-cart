const { Router } = require("express");
const authorization = require("../../middleware/authMiddleWare.js");

const router = Router();

const getOrders = require("./getOrders.js");

router.use(authorization);
router.get("/", getOrders);

module.exports = router;
