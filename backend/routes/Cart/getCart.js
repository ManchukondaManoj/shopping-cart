module.exports = async (req, res) => {
  const cart = await Promise.resolve({});
  if (cart) {
    res.json({
      cart,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User details");
  }
};
