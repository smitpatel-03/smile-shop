const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post("/product/new", createProduct);
module.exports = productRouter;
