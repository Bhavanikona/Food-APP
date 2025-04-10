import React from "react";
import "../Footer/Footer.css";


const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="row">
        <div className="col-6">
         <p className="head" style={{ fontSize: "40px",fontWeight:"600" }}>Foodie</p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aut
            odit ipsa voluptate itaque veniam, fugit autem exercitationem quasi
            incidunt nesciunt debitis, ratione voluptatibus nisi quam, in dolor.
            Sunt, facere.
          </p>
          <div className="icons">
            <span className="bi bi-facebook">  </span>
              <span className="bi bi-twitter mx-3"></span>
              <span className="bi bi-linkedin"></span>
          
          </div>
        </div>
        <div className="col-3">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="col-3">
            <h2>Get In Touch</h2>
            <ul>
                <li className="bi bi-telephone"><span className="mx-2">+91 1234567896</span></li>
                <li className="bi bi bi-envelope-heart"><span className="mx-2">contact@gmail.com</span></li>
            </ul>
        </div>
      </div>
      <hr></hr>
      <p className="copy-right text-center">
        Copy Rights 2025 @reservered
      </p>
    </div>
  );
};

export default Footer;
