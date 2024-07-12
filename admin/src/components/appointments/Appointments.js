import { useState, useEffect } from "react";
import axios from "axios";
import TableData from "./TableData";

function Appointments() {
  return (
    <>
      <h2 style={{ color: "#159eec" }}>Appointments</h2>
      <TableData />
    </>
  );
}

export default Appointments;
