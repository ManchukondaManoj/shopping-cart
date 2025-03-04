const { fireStoreDb } = require("./lib/firebaseAdmin");
const products = require("./data/products");

async function addMultipleDocuments() {
  try {
    // Create a batch instance
    const batch = fireStoreDb.batch();

    // Reference to the collection
    const productsCollection = fireStoreDb.collection("products");

    // Sample data for 10 users

    // Loop through users and add to batch
    products.forEach((item) => {
      const docRef = productsCollection.doc(); // Auto-generated ID
      batch.set(docRef, {
        ...item,
      });
    });

    // Commit batch write
    await batch.commit();
    console.log("✅ 10 documents added successfully!");
  } catch (error) {
    console.error("❌ Error adding documents:", error);
  }
}

addMultipleDocuments();
