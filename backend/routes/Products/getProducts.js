const { getFireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const productsRef = getFireStoreDb.collection("products");
    const snapshot = await productsRef.get();
    const products = [];
    snapshot.forEach((doc) => {
      products.push({
        productId: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(400);
    throw error;
  }
};
