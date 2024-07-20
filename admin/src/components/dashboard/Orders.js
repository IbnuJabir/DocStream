import * as React from "react";
import { Link } from "react-router-dom";

// import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import { Typography } from "@material-ui/core";

export default function Orders() {
  const [bookedAppointments, setBookedAppointments] = React.useState(null);
  const [message, setMessage] = React.useState("");

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  React.useEffect(() => {
    const fetchBookedAppointments = async () => {
      try {
        const result = await axios.get(
         `${process.env.REACT_APP_DOCSTREAM_API_URL}/appointment/booked`
        );
        // console.log(result.data);
        setBookedAppointments(result.data);
      } catch (error) {
        setMessage(error.response.data);
        console.error("Error fetching appointments:", error.response.data);
      }
    };

    fetchBookedAppointments();
  }, []);

  // if (bookedAppointments === null)
  //   return (
  //     <center>
  //       <h3>Loading ...</h3>
  //     </center>
  //   );
  return (
    <React.Fragment>
      <Title>Recent Booked Appointments</Title>
      <Table size="small">
        {bookedAppointments ? (
          <>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="right">Meeting Platform</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookedAppointments.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{f.format(new Date(row.createdAt))}</TableCell>
                  <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell align="right">{row.meetingPlatform}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          <h2 style={{color:"gray"}}>
            {message}
          </h2>
        )}
      </Table>
      <Link to="/appointments" style={{ color:"#159EEC" }}>
        See all Appointments
      </Link>
    </React.Fragment>
  );
}
