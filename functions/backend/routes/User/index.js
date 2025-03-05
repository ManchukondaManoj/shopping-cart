const { Router } = require("express");
const authorization = require("../../middleware/authMiddleWare.js");

const authUser = require("./authUser");
const getUser = require("./getUser");

const router = Router();

router.use(authorization);
router.post("/login", authUser);
router.get("/getUser", getUser);
// router.put("/profile", updateUser);

module.exports = router;
