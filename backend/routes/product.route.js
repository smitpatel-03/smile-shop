const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/product.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post(
  "/admin/products/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
productRouter.put(
  "/admin/products/:productId",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
productRouter.delete(
  "/admin/products/:productId",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);
productRouter.get("/products/:productId", getProductDetails);

module.exports = productRouter;
