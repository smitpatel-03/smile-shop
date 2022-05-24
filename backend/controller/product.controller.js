const Product = require("../models/product.model");

async function createProduct(req, res, next) {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
}

function getAllProducts(req, res) {
  res.status(200).json({ message: "all products" });
}

module.exports = {
  getAllProducts,
  createProduct,
};
