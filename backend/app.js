const express = require("express");
const app = express();

const productRouter = require("./routes/product.route");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", productRouter);
app.use("/api/v1", userRoute);
//middleware
app.use(errorMiddleware);

module.exports = app;
