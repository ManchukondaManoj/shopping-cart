const { fireStoreDb } = require("../lib/firebaseAdmin");

const rbacValidation = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const userRef = fireStoreDb.collection("users").doc(userId);
    const userSnap = await userRef.get();
    const isAdmin = userSnap.data().isAdmin;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ error: "You are not allowed to perform this action" });
    }
    next(); // Proceed to the next middleware/route
  } catch (error) {
    res.status(400);
    throw error;
  }
};
module.exports = rbacValidation;
