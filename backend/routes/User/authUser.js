const { fireStoreDb } = require("../../lib/firebaseAdmin");

module.exports = async (req, res) => {
  const { user_id, email, auth_time } = req.user;
  try {
    const userRef = fireStoreDb.collection("users").doc(user_id);
    const userSnap = await userRef.get();
    if (userSnap.exists) {
      return res.status(200).json({ user: userSnap.data() });
    }
    const newUser = {
      email: email || "",
      isAdmin: false,
      createdAt: auth_time,
    };
    await userRef.set(newUser);
    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
