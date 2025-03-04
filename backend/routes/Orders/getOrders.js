module.exports = async (req, res) => {
  const orders = await Promise.resolve({});
  if (orders) {
    res.json({
      orders,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User details");
  }
};
