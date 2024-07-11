import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { Context } from "../main";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get("/user/logout", { withCredentials: true });
      console.log(result.data);
      if (result.data) {
        toast.success("Successfully LoggedOut!");
        navigate("/login");
        setIsAuthenticated(false);
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const showNavbar = () => {
    setIsMenuOpen(true);
  };

  const hideNavbar = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      {/* <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav> */}
      <header>
        <nav className={isMenuOpen ? "responsive_nav" : "nav_bar"}>
          <div className="links">
            <NavLink to="/" activeClassName="active" onClick={hideNavbar}>
              Home
            </NavLink>
            <NavLink
              to="/aboutus"
              activeClassName="active"
              onClick={hideNavbar}
            >
              About Us
            </NavLink>
            <NavLink
              to="/services"
              activeClassName="active"
              onClick={hideNavbar}
            >
              Services
            </NavLink>
            <NavLink
              to="/doctors"
              activeClassName="active"
              onClick={hideNavbar}
            >
              Doctors
            </NavLink>
            <NavLink
              to="/contactus"
              activeClassName="active"
              onClick={hideNavbar}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/appointment"
              activeClassName="active"
              onClick={hideNavbar}
            >
              Appointment
            </NavLink>
          </div>
          <div className="btn_container">
            {isAuthenticated ? (
              <button className="nav_btn logout_btn" onClick={handleLogout}>
                LOGOUT
              </button>
            ) : (
              <div className="sign_log_btn">
                <button
                  className="nav_btn login_btn"
                  onClick={() => navigate("/login")}
                >
                  LOGIN
                </button>
                <button
                  className="nav_btn signup_btn"
                  onClick={() => navigate("/signup")}
                >
                  SIGNUP
                </button>
              </div>
            )}
          </div>
        </nav>
        <div className="nav-btn">
          {isMenuOpen ? (
            <FaTimes className="nav_menubar" onClick={hideNavbar} />
          ) : (
            <FaBars className="nav-close-btn" onClick={showNavbar} />
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
