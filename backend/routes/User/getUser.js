const { fireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  const { user_id } = req.user;
  try {
    const userRef = fireStoreDb.collection("users").doc(user_id);
    const userSnap = await userRef.get();
    if (userSnap.exists) {
      return res.status(200).json({
        user: {
          ...userSnap.data(),
          ...req.user,
        },
      });
    }
    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
