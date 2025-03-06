const { fireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { product } = req.body;

    const docRef = fireStoreDb.collection("products").doc(product.productId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      await docRef.update({
        updatedBy: req.user.user_id,
        ...product,
      });
      res.status(201).json({ message: "success" });
    } else {
      res
        .status(404)
        .json({ message: `Product ${product.productId} not found` });
    }
  } catch (error) {
    res.status(400);
    throw error;
  }
};
