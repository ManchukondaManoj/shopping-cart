module.exports = async (req, res) => {
  const user = await Promise.resolve({});
  if (user) {
    res.json({
      user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User details");
  }
};
