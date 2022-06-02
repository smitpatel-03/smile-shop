const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
//Create new Product --only for admin
//Use Product.create(req.body) for create the product

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
    success: true,
  });
});
//Get all products
//Use Prodcuct.find() to get all products
//if there is product then send the product else send error
const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 5;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const productCount = await Product.countDocuments();
  const product = await apiFeature.query;

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

const getProductDetails = catchAsyncError(async (req, res, next) => {
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

const updateProduct = catchAsyncError(async (req, res, next) => {
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
const deleteProduct = catchAsyncError(async (req, res, next) => {
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

// Create or Update Product Reviews

const createProductReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  console.log(req.user._id);
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

const getAllProductsReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

const deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id
  );
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  console.log(reviews);

  const ratings = avg / reviews.length || 0;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReviews,
  getAllProductsReviews,
  deleteProductReview,
};
