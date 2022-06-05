import React, { Fragment } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { ImSearch } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import "./Header.css";

const options = {
  burgerColor: "#b3b0b0",
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  profileIcon: true,
  ProfileIconElement: FaUserAlt,
  searchIcon: true,
  searchIconUrl: "/search",
  cartIconUrl: "/cart",
  SearchIconElement: ImSearch,
  cartIcon: true,
  CartIconElement: BsFillCartCheckFill,
};

const Header = () => {
  return (
    <Fragment>
      <ReactNavbar {...options} />
      <h1
        className="header-logo"
        style={{
          position: "absolute",
          color: "#b3b0b0",
          transform: "translate(-50%, 50%)",
          left: "50%",
        }}
      >
        ECOMMERCE
      </h1>
    </Fragment>
  );
};

export default Header;
