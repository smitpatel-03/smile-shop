const Product = require("../models/product.model");

//Create new Product --only for admin
//Use Product.create(req.body) for create the product
async function createProduct(req, res, next) {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
    success: true,
  });
}

//Get all products
//Use Prodcuct.find() to get all products
//if there is product then send the product else send error
async function getAllProducts(req, res) {
  const product = await Product.find();
  if (!product) {
    return res.status(500).send({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
}

async function getProductDetails(req, res, next) {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(500).send({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({ success: true, product });
}

//update Profuct --only Admin
// process explained ----------------------------------------------------------------
// get id from params
// use that id to get product
// if not get than return error
// else
// usefingbyIdAndUpdate pass the product , req.body and object of three params
// new runValidators and useFindAndModify
async function updateProduct(req, res, next) {
  const productId = req.params.productId;
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(500).send({
      success: false,
      message: "Product not found",
    });
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
}

//Delete the Product  --only Admin
// find product by id if there then send else error
async function deleteProduct(req, res, next) {
  const productId = req.params.productId;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
}

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
