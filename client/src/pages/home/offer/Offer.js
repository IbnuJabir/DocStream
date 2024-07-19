import React from "react";
import './offer.css'
import doctor from "../../../assets/images/doctor.png"
import consultation from "../../../assets/images/consultation.png"
import appointment from "../../../assets/images/appointment.png"
import solution from "../../../assets/images/solution.png"
function Offer() {
  return (
    <div id="offer" className="offer">
      <div className="offer_card">
        <img src={doctor} alt="#" />
        <p className="offer_title">Search Doctor</p>
        <p className="offer_desc">
          Registration for a cehck at the clinic needed for treatment
        </p>
      </div>
      <div className="offer_card">
        <img src={consultation} alt="#" />
        <p className="offer_title">Request a Consultation</p>
        <p className="offer_desc">
          Registration for a cehck at the clinic needed for treatment
        </p>
      </div>
      <div className="offer_card">
        <img src={appointment} alt="#" />
        <p className="offer_title">Make Appoinment</p>
        <p className="offer_desc">
          Registration for a cehck at the clinic needed for treatment
        </p>
      </div>
      <div className="offer_card">
        <img src={solution} alt="#" />
        <p className="offer_title">Get Solution</p>
        <p className="offer_desc">
          Registration for a cehck at the clinic needed for treatment
        </p>
      </div>
    </div>
  );
}

export default Offer;
