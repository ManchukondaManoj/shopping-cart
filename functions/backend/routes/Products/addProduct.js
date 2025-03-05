const { fireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { product } = req.body;
    const productRef = fireStoreDb.collection("products").doc();

    await productRef.set({
      userId: req.user.user_id,
      ...product,
      createdAt: new Date().getTime(),
    });
    res.status(200).json({ message: "Product added" });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};
