const { fireStoreDb, fireStore } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { orderData } = req.body;

    let hasCart = false;

    const productsInCart = orderData.items.map((o) => o.product);
    const productRef = fireStoreDb.collection("products");
    const cartRef = fireStoreDb.collection("cart").doc(req.user.user_id);
    const cartSnap = await cartRef.get();

    if (cartSnap.exists) {
      hasCart = true;
    }

    const snapshot = await productRef
      .where("productId", "in", productsInCart)
      .select("countInStock") // Select only the "qty" field
      .get();

    const productAndAvailableStock = {};
    snapshot.forEach((doc) => {
      productAndAvailableStock[doc.id] = parseInt(doc.data().countInStock);
    });

    const orderDetails = {
      ...orderData,
      createdAt: new Date().getTime(),
      userId: req.user.user_id,
      orderStatus: "Pending",
    };

    const orderRef = fireStoreDb.collection("orders").doc();

    const userCartRef = fireStoreDb
      .collection("cart") // Change this to the collection you're targeting
      .doc(req.user.user_id);

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
            // Replace with the document ID you want to delete

            // Deleting the document within the transaction
            if (hasCart) {
              transaction.delete(userCartRef);
            }
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
