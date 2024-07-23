import React from "react";
import "./top.css";
import { Link } from "react-router-dom";
function Top() {
  return (
    <div id="home" className="top">
      <div className=" description">
        <h2>
          Bridging <span>Healthcare</span> Beyond Distance.
        </h2>
        <p>
          Make a <span>difference</span> in the lives of others Health. check
          your health for your good
        </p>
        <Link to="/appointment">
          <button>Book Appointment</button>
        </Link>
      </div>
    </div>
  );
}

export default Top;
