import React from "react";
import "./home.css";
import Top from "./top/top";
import Footer from "./footer/Footer";
import Services from "./services/Services";
import Offer from "./offer/Offer";
import Experts from "./experts/Experts";
import About from "./about/About";

function Home() {
  return (
    <div id="home" className="home">
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
