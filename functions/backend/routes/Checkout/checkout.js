const {
  getFireStoreDb,
  fireStoreDb,
  fireStore,
} = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { orderData } = req.body;

    const productsInCart = orderData.items.map((o) => o.product);
    const productRef = getFireStoreDb.collection("products");

    const snapshot = await productRef
      .where("productId", "in", productsInCart)
      .select("countInStock") // Select only the "qty" field
      .get();

    const productAndAvailableStock = {};
    snapshot.forEach((doc) => {
      productAndAvailableStock[doc.id] = doc.data().countInStock;
    });

    const orderDetails = {
      ...orderData,
      createdAt: new Date().getTime(),
      userId: req.user.user_id,
      orderStatus: "Pending",
    };

    const orderRef = fireStoreDb.collection("orders").doc();

    try {
      await fireStoreDb.runTransaction(async (transaction) => {
        transaction.set(orderRef, orderDetails);

        for (const item of orderData.items) {
          const availableQty = productAndAvailableStock[item.product];
          const selectedQty = item.qty;
          if (selectedQty > availableQty) {
            throw new Error(`${item.name} has only ${availableQty} in stock`);
          } else {
            const productRef = fireStoreDb
              .collection("products")
              .doc(String(item.product));

            transaction.update(productRef, {
              countInStock: fireStore.FieldValue.increment(-item.qty),
            });
            console.log("Transaction committed successfully!");
            return res
              .status(200)
              .json({ message: "Order Placed successfully" });
          }
        }
      });
    } catch (error) {
      console.error("Transaction failed: ", error);
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
