import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/userSlice";
import toast from "react-hot-toast";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Successfully LoggedOut!");
    navigate("/login");
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
            {isLoggedIn ? (
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
            // <GiHamburgerMenu />
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
