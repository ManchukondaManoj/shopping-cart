const { fireStoreDb } = require("../../lib/firebaseAdmin");
module.exports = async (req, res) => {
  const cartRef = fireStoreDb.collection("cart").doc(req.user.user_id);
  try {
    const cartSnap = await cartRef.get();
    if (cartSnap.exists) {
      const data = { cartId: cartSnap.id, ...cartSnap.data() };
      res.status(200).json(data);
    } else {
      res.status(200).json({
        data: {
          cart: [],
        },
      });
    }
  } catch (error) {
    res.status(400);
    throw error;
  }
};
