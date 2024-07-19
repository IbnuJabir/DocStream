import React from "react";
import "./about.css";
function About() {
  return (
    <div id="aboutus" className="about">
      <h1>About Us</h1>
      <div className="about_container">
        <div className="about_left">
        </div>
        <div className="about_right">
          <p>
            <strong>DocStream</strong> is a cutting-edge hospital management system designed to
            streamline administrative tasks and enhance patient care. Our
            platform offers a comprehensive dashboard for quick access to vital
            data, advanced appointment and transaction management, and efficient
            doctor management.
          </p>
          <p>
            With features like automated email notifications, detailed
            reporting, and seamless payment integration, DocStream simplifies
            the complexities of hospital administration. Built with the latest
            technologies, our system ensures reliability, scalability, and a
            user-friendly experience.
          </p>
          <p>
            Experience the future of healthcare management with DocStream –
            where efficiency meets excellence.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
