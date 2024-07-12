import AddDoctor from "./AddDoctor";
import DoctorsData from "./DoctorsData";

function Doctors() {
  return (
    <>
      <h2 style={{ color: "#159eec" }}>Doctors</h2>
      <AddDoctor />
      <DoctorsData />
    </>
  );
}

export default Doctors;
