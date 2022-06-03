import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import Pagination from "react-js-pagination";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import "./products.css";
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const {
    products,
    loading,
    error,
    productCount,
    resultsPerPage,
    filterProductsCount,
  } = useSelector((state) => state.products);
  const alert = useAlert();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, error, alert, keyword, currentPage, price]);
  const count = filterProductsCount;
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
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
          </div>
          {resultsPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
