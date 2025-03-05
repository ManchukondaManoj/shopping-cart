const { fireStoreDb, fireStore } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  try {
    const { orderData } = req.body;

    const orderDetails = {
      ...orderData,
      orderStatus: "Pending",
    };

    const orderRef = fireStoreDb.collection("orders").doc();

    try {
      await fireStoreDb.runTransaction(async (transaction) => {
        transaction.set(orderRef, orderDetails);

        for (const item of orderData.items) {
          const productRef = fireStoreDb
            .collection("products")
            .doc(String(item.product));

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
