function getAllProducts(req, res) {
  res.status(200).json({ message: "all products" });
}

module.exports = {
  getAllProducts,
};
