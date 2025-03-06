const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { readFileSync } = require("fs");
const serviceAccount = require("../serviceAccountDetails");

const serviceAccountJson = serviceAccount();

// const serviceAccount = JSON.parse(
//   readFileSync("./shoppingcart-serviceAccount.json", "utf-8")
// );

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
  });
}

const adminAuth = admin.auth();
const fireStoreDb = admin.firestore();
const getFireStoreDb = getFirestore();
const fireStore = admin.firestore;
module.exports = {
  adminAuth,
  fireStoreDb,
  getFireStoreDb,
  fireStore,
};
