import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import "./Home.css";
import MetaData from "../layout/MetaData";

const product = {
  name: "tshirt",
  images: [{ url: "https://picsum.photos/id/237/200/300" }],
  price: "2000",
  _id: "id001",
};

const Home = () => {
  return (
    <Fragment>
      <MetaData title="Ecommerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
