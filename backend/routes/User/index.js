const { Router } = require("express");
const authorization = require("../../middleware/authMiddleWare.js");

const authUser = require("./authUser");
// import getUser from "./getUser";
// import updateUser from "./updateUser";

const router = Router();

router.use(authorization);
router.post("/login", authUser);
// router.get("/profile", getUser);
// router.put("/profile", updateUser);

module.exports = router;
