const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const productRouter = require("./routes/product.route");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const orderRoute = require("./routes/order.route");
const paymentRouter = require("./routes/payment.route");
require("dotenv").config({ path: "backend/config/config.env" });

const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api/v1", productRouter);
app.use("/api/v1", userRoute);
app.use("/api/v1/", orderRoute);
app.use("/api/v1", paymentRouter);

//middleware
app.use(errorMiddleware);

module.exports = app;
