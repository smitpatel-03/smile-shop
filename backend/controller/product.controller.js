const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeature = require("../utils/apiFeatures");
//Create new Product --only for admin
//Use Product.create(req.body) for create the product

createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
    success: true,
  });
});
//Get all products
//Use Prodcuct.find() to get all products
//if there is product then send the product else send error
getAllProducts = catchAsyncError(async (req, res) => {
  const apiFetures = new ApiFeature(Product, req.query).search();
  const product = await apiFetures.qurey;

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

getProductDetails = catchAsyncError(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

//update Profuct --only Admin
// process explained ----------------------------------------------------------------
// get id from params
// use that id to get product
// if not get than return error
// else
// usefingbyIdAndUpdate pass the product , req.body and object of three params
// new runValidators and useFindAndModify

updateProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.productId;
  let product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).send({
    success: true,
    product,
  });
});

//Delete the Product  --only Admin
// find product by id if there then send else error
deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
};

// sample for test
// {
//     "name": "demo3",
//     "price": "1200",
//     "description": "test",
//     "category": "electro",
//     "images": {
//         "public_id": "sampleId",
//         "url": "sampleurl"
//     }
// }
