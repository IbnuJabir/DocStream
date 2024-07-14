import React, { useContext } from "react";
import Departments from "../components/Departments";
import MedicalExcellenceSection from "../components/MedicalExcellenceSection";
import CareContainer from "../components/CareContainer";
import Doctors from "../components/Doctors";
function RootPage() {
  return (
    <div>
    <MedicalExcellenceSection />
      <CareContainer />
      <Doctors />
    </div>
  );
}

export default RootPage;
