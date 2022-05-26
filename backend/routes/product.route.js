const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/product.controller");
const isAuthenticatedUser = require("../middleware/auth");
const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post("/products/new", isAuthenticatedUser, createProduct);
productRouter.put("/products/:productId", isAuthenticatedUser, updateProduct);
productRouter.delete(
  "/products/:productId",
  isAuthenticatedUser,
  deleteProduct
);
productRouter.get("/products/:productId", getProductDetails);

module.exports = productRouter;
