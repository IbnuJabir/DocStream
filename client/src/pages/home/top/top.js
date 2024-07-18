import React from "react";
import './top.css'
import avatar from "../../../assets/images/avatar.png";
function Top() {
  return (
    <div className="top">
      <div className=" description">
        <h2>
          Make a <span>difference</span> in the lives of others
        </h2>
        <p>
          Health is one of the most important things for us therefore
          immediately check your health for your good
        </p>
        <button>Book Appointment</button>
      </div>
    </div>
  );
}

export default Top;
