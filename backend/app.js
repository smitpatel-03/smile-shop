const express = require("express");
const app = express();
app.use(express.json());
const productRouter = require("./routes/product.route");
const errorMiddleware = require("./middleware/error");

app.use("/api/v1", productRouter);

//middleware
app.use(errorMiddleware);

module.exports = app;
