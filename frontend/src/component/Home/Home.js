import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Categories from "./Categories/Categories";
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      console.log(error);
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <h1>Super value deals</h1>
            <h1>On all products</h1>
            <div>
              <Link to="/products">
                <button>Shop now</button>
              </Link>
              <a href="#container">
                <button>
                  Scroll <CgMouse />
                </button>
              </a>
            </div>
          </div>
          <h2 className="homeHeading">Categories</h2>
          <Categories />
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
