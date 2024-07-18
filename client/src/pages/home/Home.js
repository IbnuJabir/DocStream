import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import MedicalExcellenceSection from "../../components/MedicalExcellenceSection";
import CareContainer from "../../components/CareContainer";
import "./home.css";
import Doctors from "../../components/Doctors";
import Button from "react-bootstrap/Button";
import Top from "./top/top";
import Footer from "./footer/Footer";
import Navbar from "../navbar/Navbar";
import Services from "./services/Services";
import Offer from "./offer/Offer";
import Experts from "./experts/Experts";
import About from "./about/About";

function Home() {
  return (
    <div className="home">
      {/* <h1>Hello</h1> */}
      {/* <MedicalExcellenceSection />
      <CareContainer />
      <Doctors />
      <section id="aboutus">
        <Button>Hello world</Button>
      </section> */}
      <Top />
      <Offer />
      <About />
      <Services />
      <Experts />
      <Footer />
    </div>
  );
}

export default Home;
