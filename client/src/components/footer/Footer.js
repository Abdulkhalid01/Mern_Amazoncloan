import React from "react";
import './footer.css'

function Footer() {

   const year = new Date().getFullYear();
  //  console.log(year);
   

  return (
    <footer>
      <div className="footer_container">
        <div className="footer_details_one">
          <h3>Get to know US</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Amazon Cares</p>
        </div>
        <div className="footer_details_one">
          <h3>Connect with Us</h3>
          <p>Faceboook</p>
          <p>twitter</p>
          <p>Instagram</p>
        </div>
        <div className="footer_details_one forres">
          <h3>Make Money with US</h3>
          <p>Sell on Amazon</p>
          <p>Protect and Build Your Brand</p>
          <p>Amazon Global Selling</p>
          <p>Supply to Amazon</p>
        </div>
        <div className="footer_details_one forres">
          <h3>Let Us Help You</h3>
          <p>Your Account</p>
          <p>Returns Centre</p>
          <p>100% Purchase Protection</p>
          <p>Amazon App Download</p>
        </div>
      </div>
      <div className="lastdetails">
        <img src="./amazon_PNG25.png" alt="" />
        <p>
          Conditions of Use & Sale Privacy Notice Interest-Based Ads ©
          1996-{year}, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}

export default Footer;
