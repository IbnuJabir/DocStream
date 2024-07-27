import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/images/DocStream.png";
import { logout } from "../../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onButtonContainerClick = useCallback(() => {
    if (isLoggedIn) {
      navigate("/my-appointments");
    } else {
      navigate("/appointment");
    }
  }, [isLoggedIn, navigate]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    toast.success("Successfully LoggedOut!");
    navigate("/login");
  };

  const handleScroll = () => {
    const sections = ["home", "aboutus", "services", "doctors", "contact"];
    let currentSection = "home";

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = section;
        }
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="nav">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navbar-links">
          <a
            className={
              activeSection === "home" ? "navbar-link isActive" : "navbar-link"
            }
            href="/home"
          >
            Home
          </a>
          <a
            className={
              activeSection === "aboutus"
                ? "navbar-link isActive"
                : "navbar-link"
            }
            href="#aboutus"
          >
            About Us
          </a>
          <a
            className={
              activeSection === "services"
                ? "navbar-link isActive"
                : "navbar-link"
            }
            href="#services"
          >
            Services
          </a>
          <a
            className={
              activeSection === "doctors"
                ? "navbar-link isActive"
                : "navbar-link"
            }
            href="#doctors"
          >
            Doctors
          </a>
          <a
            className={
              activeSection === "contact"
                ? "navbar-link isActive"
                : "navbar-link"
            }
            href="#contact"
          >
            Contact
          </a>
        </div>
        <div className="navbar-appointment">
          <div className="appointment-button" onClick={onButtonContainerClick}>
            Appointment
          </div>
        </div>
        <div className="btn_container">
          {isLoggedIn ? (
            <button className="nav_btn logout_btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <div className="sign_log_btn">
              <button
                className="nav_btn signup_btn"
                onClick={() => navigate("/login")}
              >
                SIGNUP
              </button>
            </div>
          )}
        </div>
        <div className="menu-icon" onClick={toggleMobileMenu}>
          &#9776; {/* Unicode for hamburger menu icon */}
        </div>
      </div>
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : "closed"}`}>
        <a
          className={
            activeSection === "home" ? "navbar-link isActive" : "navbar-link"
          }
          href="/home"
          onClick={toggleMobileMenu}
        >
          Home
        </a>
        <a
          className={
            activeSection === "aboutus" ? "navbar-link isActive" : "navbar-link"
          }
          href="#aboutus"
          onClick={toggleMobileMenu}
        >
          About Us
        </a>
        <a
          className={
            activeSection === "services"
              ? "navbar-link isActive"
              : "navbar-link"
          }
          href="#services"
          onClick={toggleMobileMenu}
        >
          Services
        </a>
        <a
          className={
            activeSection === "doctors" ? "navbar-link isActive" : "navbar-link"
          }
          href="#doctors"
          onClick={toggleMobileMenu}
        >
          Doctors
        </a>
        <a
          className={
            activeSection === "contact" ? "navbar-link isActive" : "navbar-link"
          }
          href="#contact"
          onClick={toggleMobileMenu}
        >
          Contact
        </a>
        <div className="mobile_btn_container navbar-link">
          {isLoggedIn ? (
            <button className="nav_btn logout_btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button
              className="nav_btn signup_btn"
              onClick={() => {
                setMobileMenuOpen(!isMobileMenuOpen);
                navigate("/login");
              }}
            >
              SIGNUP
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Navbar;
