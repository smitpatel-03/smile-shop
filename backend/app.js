const express = require("express");
const app = express();
app.use(express.json());
const productRouter = require("./routes/product.route");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/user.route");

app.use("/api/v1", productRouter);
app.use("/api/v1", userRoute);
//middleware
app.use(errorMiddleware);

module.exports = app;
