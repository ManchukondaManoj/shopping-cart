const { Router } = require("express");
const router = Router();

const products = require("./Products");
const user = require("./User");
const orders = require("./Orders");
const checkout = require("./Checkout");

router.use("/products", products);
router.use("/auth", user);
router.use("/checkout", checkout);
router.use("/orders", orders);

module.exports = router;
