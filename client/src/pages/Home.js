import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import MedicalExcellenceSection from "../components/MedicalExcellenceSection";
import CareContainer from "../components/CareContainer";
import '../style/home.css'
import Doctors from "../components/Doctors";
function Home() {

 
  return (
    <div className="home">
      <MedicalExcellenceSection />
      <CareContainer />
      <Doctors />
      {/* <h1>Home Page</h1> */}
    </div>
  );
}

export default Home;
