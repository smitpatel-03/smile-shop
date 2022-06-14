import React, { Fragment } from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <Fragment>
      <div className="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <div className="contact">
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
      </div>
    </Fragment>
  );
};

export default Contact;
