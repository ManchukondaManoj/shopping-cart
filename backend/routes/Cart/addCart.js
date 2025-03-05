const { fireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { cart: userCart } = req.body;
    const cartRef = fireStoreDb.collection("cart").doc(req.user.user_id);

    await cartRef.set({
      userId: req.user.user_id,
      cart: userCart,
      createdAt: new Date().getTime(),
    });
    res.status(200).json({ message: "Cart created" });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};
