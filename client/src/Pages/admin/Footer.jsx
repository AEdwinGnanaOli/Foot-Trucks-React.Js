import React from "react";
import{Link} from 'react-router-dom'
import "./css/footer.css";
import { FacebookFilled, InstagramOutlined, XOutlined } from "@ant-design/icons";
function Footers() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>
              Food Truck  is dedicated to bringing you the best street
              food experience with fresh, locally sourced ingredients.
            </p>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: info@foodtruck.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="footer-section social">
            
            <h3>Follow Us</h3>
            <Link
              to="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
            <span className="icons icon-fb"><FacebookFilled /></span>
              Facebook
            </Link>
            <Link
             to="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
                <span className="icons icon-x"><XOutlined /></span>
              Twitter
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
                <span className="icons icon-ins"><InstagramOutlined /></span>
              Instagram
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footers;
