const { fireStoreDb, fireStore } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { orderData } = req.body;

    const orderRef = fireStoreDb.collection("orders").doc();

    try {
      await fireStoreDb.runTransaction(async (transaction) => {
        // Insert the order document
        transaction.set(orderRef, orderData);

        // Loop through each item in the orderData's items array
        for (const item of orderData.items) {
          // Assume each item has a productId property.
          // Convert productId to a string if necessary.
          const productRef = fireStoreDb
            .collection("products")
            .doc(String(item.product));

          // Update the product document, setting countInstock to 1
          // transaction.update(productRef, { countInstock: 1 });
          transaction.update(productRef, {
            countInStock: fireStore.FieldValue.increment(-item.qty),
          });
        }
      });
      console.log("Transaction committed successfully!");
    } catch (error) {
      console.error("Transaction failed: ", error);
    }

    res.json({
      order: orderRef,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};
