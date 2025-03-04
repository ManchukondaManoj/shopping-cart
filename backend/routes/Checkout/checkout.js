const { fireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { orderData } = req.body;
    const orderRef = fireStoreDb.collection("orders").doc();
    await orderRef.set({
      userId: req.user.user_id,
      ...orderData,
      createdAt: new Date().getTime(),
    });
    res.json({
      order: orderRef,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};
