import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usePaymentDataStore } from "../context/usePaymentStore";
import { useCounterStore } from "../store/useCounterStore";
import PaymentComponent from "./PaymentComponent";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const { paymentInfo, changePaymentData } = useCounterStore();

  // const { paymentData, changePaymentData } = usePaymentDataStore();
  // const paymentData = paymentDataStore((state) => state.paymentData);
  console.log(paymentInfo);
  if (!paymentInfo) {
    return (
      <>
        <h1>PaymentSuccess Table</h1>
        <div>Loading...</div>
      </>
    );
  }
  return (
    <>
      <h1>PaymentSuccess Table</h1>
      <PaymentComponent />
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
              <TableCell component="th" scope="row">
                {paymentInfo.first_name}
              </TableCell>
              <TableCell align="right">{paymentInfo.last_name}</TableCell>
              <TableCell align="right">{`${paymentInfo.amount} ${paymentInfo.currency}`}</TableCell>
              <TableCell align="right">{paymentInfo.tx_ref}</TableCell>
              <TableCell align="right">{paymentInfo.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
