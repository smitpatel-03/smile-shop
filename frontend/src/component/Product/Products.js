import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import "./products.css";
const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
