import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function BasicTable() {

  return (
    <>
      <h1>PaymentSuccess Table</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Transaction Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {paymentInfo.first_name}
              </TableCell>
              <TableCell align="right">{paymentInfo.last_name}</TableCell>
              <TableCell align="right">{`${paymentInfo.amount} ${paymentInfo.currency}`}</TableCell>
              <TableCell align="right">{paymentInfo.tx_ref}</TableCell>
              <TableCell align="right">{paymentInfo.email}</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
