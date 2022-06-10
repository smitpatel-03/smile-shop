const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReviews,
  getAllProductsReviews,
  deleteProductReview,
  getAdminProducts,
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
productRouter.get("/product/:productId", getProductDetails);

productRouter.put("/reviews", isAuthenticatedUser, createProductReviews);

productRouter
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
productRouter
  .route("/reviews")
  .get(getAllProductsReviews)
  .delete(isAuthenticatedUser, deleteProductReview);
module.exports = productRouter;
