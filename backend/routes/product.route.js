const express = require("express");
const { getAllProducts } = require("../controller/product.controller");
const productRouter = express.Router();

productRouter.get("/products", getAllProducts);

module.exports = productRouter;
