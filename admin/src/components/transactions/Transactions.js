import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayData from "./TransactionTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../state/transactionSlice";
function Transactions() {
  const { transactions, isLoading, error } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <h2 style={{ color: "#159eec" }}>Transactions</h2>
      {transactions.length > 0 ? (
        <DisplayData data={transactions} />
      ) : (
        <h2>No transactions found.</h2>
      )}
    </>
  );
}

export default Transactions;
