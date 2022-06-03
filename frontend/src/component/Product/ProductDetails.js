import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { getProductDetails } from "../../actions/productActions";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import { Rating } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      return alert.error(error);
    }
    dispatch(getProductDetails(params.productId));
  }, [dispatch, alert, params, error]);

  return (
    <Fragment>
      <MetaData title={product.name} />
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div style={{ width: "60%" }}>
              <Carousel>
                {product.images &&
                  product.images.map((item, index) => (
                    <img src={item.url} alt={item.url} key={index} />
                  ))}
              </Carousel>
            </div>
            <div style={{ display: "flex" }}>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    // onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="reviewsHeading">REVIEWS</h3>
            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
