import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      <div className="product-container">
        <Link to={`/product/${product._id}`} className="productCard">
          <img src={product.images[0].url} alt={product.name} />
          <p>{product.name}</p>
          <h6>{product.category}</h6>
          <div>
            <ReactStars {...options} />{" "}
            <span> {product.numOfReviews} Reviews</span>
          </div>
          <span>{`₹${product.price}`}</span>
        </Link>
      </div>
    </Fragment>
  );
};

export default ProductCard;
