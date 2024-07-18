import React, { useEffect } from "react";
import "./appointment.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserAppointments } from "../../state/appointmentSlice";
import { Alert, List, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemContent from "@mui/joy/ListItemContent";
import ListDivider from "@mui/joy/ListDivider";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

function MyAppointments() {
  const { userAppointments, isLoading, error } = useSelector(
    (state) => state.appointment
  );
  const { userEmail } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAppointments(userEmail));
  }, [dispatch]);

  return (
    <div className="my_appointments">
      <h2>My Appointments</h2>
      <Link to='/appointment' className="new_app_link">New Appointment</Link>
      {error && (
        <div style={{ width: "70%" }}>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {userAppointments.map((apt, idx) => (
        <List
          component="ol"
          marker="decimal"
          orientation="horizontal"
          key={idx}
        >
          <ListItem role="none"  sx={{color:"#003639"}}>
            <ListItemButton
              role="menuitem"
              component="a"
                sx={{color:"#003639", fontWeight: "bold",display: "flex", justifyContent:"flex-start",}} // Adjust the gap value as needed
            >
              <ListItemText primary={apt.treatment} />
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ListItemText
                  primary={new Date(apt.updatedAt).toLocaleDateString()}
                />
                <ListItemText
                  primary={apt.status}
                />
                <IoIosArrowDropright />
              </div>
            </ListItemButton>
          </ListItem>
        </List>
      ))}
    </div>
  );
}

export default MyAppointments;
