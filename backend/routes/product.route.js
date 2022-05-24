const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post("/products/new", createProduct);
productRouter.put("/products/:productId", updateProduct);
productRouter.delete("/products/:productId", deleteProduct);
productRouter.get("/products/:productId", getProductDetails);

module.exports = productRouter;
