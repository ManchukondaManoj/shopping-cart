// const { doc, getDoc } = require("firebase/firestore");
const { fireStoreDb } = require("../../lib/firebaseAdmin");
module.exports = async (req, res) => {
  const docRef = fireStoreDb.collection("products").doc(req.params.id);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    const data = { productId: docSnap.id, ...docSnap.data() };
    res.status(200).json(data);
  } else {
    res.status(400).json({ error: "Product not found" });
  }
};
