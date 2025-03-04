const { adminAuth } = require("../lib/firebaseAdmin");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken; // Attach user data to request
    next(); // Proceed to the next middleware/route
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
module.exports = authenticate;
