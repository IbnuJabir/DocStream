import { useState, useEffect } from "react";
import axios from "axios";
import TableData from "./TableData";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../../state/appointmentSlice";
function Appointments() {
  const { appointments } = useSelector((store) => store.appointment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments());
  }, []);

  // if (appointments === null) return <h1>Loading ...</h1>;
  return (
    <>
      <h2 style={{ color: "#159eec" }}>Appointments</h2>
      <TableData data={appointments} />
    </>
  );
}

export default Appointments;
