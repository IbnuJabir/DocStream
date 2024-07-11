import { useCallback } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/appointment");
  }, [navigate]);

  return (
    <div className="navbar">
      <div className="navbar-links">
        <NavLink  className={({ isActive }) => (isActive ? 'navbar-link' : '')} to="/home">
          Home
        </NavLink>
        <NavLink  className={({ isActive }) => (isActive ? 'navbar-link' : '')} to="/aboutus">
          About Us
        </NavLink>
        <NavLink  className={({ isActive }) => (isActive ? 'navbar-link' : '')} to="/services">
          Services
        </NavLink>
        <NavLink  className={({ isActive }) => (isActive ? 'navbar-link' : '')} to="/doctors">
          Doctors
        </NavLink>
        <NavLink  className={({ isActive }) => (isActive ? 'navbar-link' : '')} to="/news">
          News
        </NavLink>
        <NavLink  className={({ isActive }) => (isActive ? 'navbar-link' : '')} to="/contact">
          Contact
        </NavLink>
      </div>
      <div className="navbar-appointment">
        <img className="navbar-logo" alt="Logo" src="/group-175.svg" />
        <div className="appointment-button" onClick={onButtonContainerClick}>
          Appointment
        </div>
      </div>
    </div>
  );
};

export default Navbar;
