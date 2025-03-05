const { fireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { product } = req.body;

    const docRef = fireStoreDb.collection("products").doc(product.productId);
    await docRef.update({
      updatedBy: req.user.user_id,
      ...product,
    });
    res.status(200).json({ message: "product updated properly" });
  } catch (error) {
    res.status(400);
    throw error;
  }
};
