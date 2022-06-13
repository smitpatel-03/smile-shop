import React from "react";
import logo from "../../../images/smile-shop.png";
import GooglePlay from "../../../images/playstore.png";
import AppStore from "../../../images/Appstore.png";
import Pay from "../../../images/pay.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <section className="footer-section">
      <div className="col">
        <img src={logo} alt="logo" className="footer-logo" />
        <h4>Contact</h4>
        <p>
          <strong>Address:</strong> lorem ipsum dolor sit amet con adssd sdsd
        </p>
        <p>
          <strong>Phone:</strong> <a href="tel:+9198765432">+9198765432</a>
        </p>
        <p>
          <strong>Hours:</strong> 10:00 to 18:00 , Mon-Sat
        </p>
        <div className="follow">
          <h4>Follow Us</h4>
          <a href="https://www.instagram.com/_smit._patel._/">
            <InstagramIcon />
          </a>
          <a href="https://github.com/smitpatel-03">
            <GitHubIcon />
          </a>
          <a href="https://www.linkedin.com/in/smit-patel-0303/">
            <LinkedInIcon />
          </a>
        </div>
      </div>
      <div className="col">
        <h4>About us</h4>
        <Link to="/about">About</Link>
        <Link to="/">Delivery Information</Link>
        <Link to="/">Privacy Policy</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="col">
        <h4>My Account</h4>
        <Link to="/login">Sign In</Link>
        <Link to="/cart">View Cart</Link>
        <Link to="/orders">Track My Order</Link>
        <Link to="/">Help</Link>
      </div>
      <div className="col">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src={GooglePlay} alt="" className="app-img" />
          <img src={AppStore} alt="" className="app-img" />
        </div>
        <img src={Pay} alt="" />
      </div>
      <div className="copyright">
        <p>&copy; Made with ❤ by Smitkumar Patel</p>
      </div>
    </section>
  );
};

export default Footer;
