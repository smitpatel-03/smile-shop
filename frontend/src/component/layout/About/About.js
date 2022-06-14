import React, { Fragment } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../Contact/Contact.css";
import "./About.css";
const About = () => {
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
      <div className="about">
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
    </Fragment>
  );
};

export default About;
