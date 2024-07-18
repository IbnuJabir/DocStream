import React from "react";
import "./services.css";
import consultation from "../../../assets/images/consultation.png";
import pharma from "../../../assets/images/pharmacy.png";
import hospital from "../../../assets/images/hospital.png";
import bed from "../../../assets/images/bed.png";
import brain from "../../../assets/images/barin.png";
import neuron from "../../../assets/images/neuron.png";
import cardiology from "../../../assets/images/cardiology.png";
import Rheumatology from "../../../assets/images/Rheumatology.png";

function Services() {
  return (
    <>
      <h1 className="services_title">Services</h1>
      <section className="services">
        <div className="service_left">
          <div className="service_card selected">
            <img src={cardiology} alt="#" />
            <p className="service_title">Cardiology</p>
          </div>
          <div className="service_card">
            <img src={neuron} alt="#" />
            <p className="service_title">Neurology</p>
          </div>
          <div className="service_card">
            <img src={brain} alt="#" />
            <p className="service_title">Psychiatry</p>
          </div>
          <div className="service_card">
            <img src={Rheumatology} alt="#" />
            <p className="service_title">Rheumatology</p>
          </div>
        </div>
        <div className="services_right">
          <h2>Cardiology</h2>
          <p>
            We offer a full range of diagnostic and therapeutic services for
            various heart conditions, including: Heart Disease Prevention and
            Management: Our preventive cardiology services focus on identifying
            and managing risk factors such as hypertension, high cholesterol,
            and diabetes to prevent heart disease.
            <br></br>
            <strong> Diagnostic Testing:</strong> We utilize state-of-the-art diagnostic
            tools, including electrocardiograms (EKG), echocardiograms, stress
            tests, and advanced imaging techniques, to accurately diagnose.
          </p>
          <a href="#">MORE......</a>
        </div>
      </section>
    </>
  );
}

export default Services;
