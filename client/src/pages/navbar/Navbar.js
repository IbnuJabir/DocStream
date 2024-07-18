import React, { useState, useCallback } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/images/DocStream.png";
import { logout } from "../../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const onButtonContainerClick = useCallback(() => {
    if(isLoggedIn){
      navigate("/my-appointments");
    }else{

      navigate("/appointment");
    }
  }, [navigate]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Successfully LoggedOut!");
    navigate("/login");
  };
  return (
    <section className="nav">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navbar-links">
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link isActive" : "navbar-link"
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link isActive" : "navbar-link"
            }
            to="/aboutus"
          >
            About Us
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link isActive" : "navbar-link"
            }
            to="/services"
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link isActive" : "navbar-link"
            }
            to="/doctors"
          >
            Doctors
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link isActive" : "navbar-link"
            }
            to="/contact"
          >
            Contact
          </NavLink>
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
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-link isActive" : "navbar-link"
          }
          to="/home"
          onClick={toggleMobileMenu}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-link isActive" : "navbar-link"
          }
          to="/aboutus"
          onClick={toggleMobileMenu}
        >
          About Us
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-link isActive" : "navbar-link"
          }
          to="/services"
          onClick={toggleMobileMenu}
        >
          Services
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-link isActive" : "navbar-link"
          }
          to="/doctors"
          onClick={toggleMobileMenu}
        >
          Doctors
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar-link isActive" : "navbar-link"
          }
          to="/contact"
          onClick={toggleMobileMenu}
        >
          Contact
        </NavLink>
        <div className="mobile_btn_container navbar-link">
          {isLoggedIn ? (
            <button className="nav_btn logout_btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
              <button
                className="nav_btn signup_btn "
                onClick={() => navigate("/login")}
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
