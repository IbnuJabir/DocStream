import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-area">
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div className="logo">
                <Link to="/">
                  <img src="assets/img/logo/logo.png" alt="Logo" />
                </Link>
              </div>
              <div className="d-none d-lg-flex align-items-center">
                {/* Main-menu */}
                <nav className="main-menu">
                  <ul id="navigation" className="d-flex">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li>
                      <Link to="/blog">Blog</Link>
                      <ul className="submenu">
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/blog-details">Blog Details</Link></li>
                        <li><Link to="/elements">Element</Link></li>
                      </ul>
                    </li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </nav>
                <div className="header-right-btn ml-15">
                  <Link to="#" className="btn header-btn">Make an Appointment</Link>
                </div>
              </div>
              {/* Mobile Menu */}
              <div className="d-lg-none">
                <div className="mobile_menu"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
