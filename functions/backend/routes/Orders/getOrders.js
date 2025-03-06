const { getFireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const orderRef = getFireStoreDb.collection("orders");
    const snapshot = await orderRef
      .where("userId", "==", req.user.user_id)
      .get();
    const orders = [];
    snapshot.forEach((doc) => {
      orders.push({
        orderId: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400);
    throw error;
  }
};
