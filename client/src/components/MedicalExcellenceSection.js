import { useCallback } from "react";
// import Button from "./Button";
import PropTypes from "prop-types";
import "../style/MedicalExcellenceSection.css";

const MedicalExcellenceSection = () => {
  const onButtonContainerClick = useCallback(() => {
    // Navigate to "Services" page
  }, []);

  return (
    <div className="medical-excellence-section">
      <div className="text_container">
        <p className="sub_title">Caring for Life</p>
        <div className="main_title">
          <p>Leading the Way</p>
          <p>in Medical Excellence</p>
        </div>
        <button className="service_btn">Our Services</button>
      </div>
    </div>
  );
};

export default MedicalExcellenceSection;
