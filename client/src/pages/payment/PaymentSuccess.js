import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./PaymentSuccess.css";
import axios from "axios";
import { FaStarOfLife } from "react-icons/fa6";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");
    if (tx_ref) {
      setLoading(true);
      axios
        .get(`/transactions/${tx_ref}`)
        .then((res) => {
          setTransactionDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(
            err?.response?.data?.error ||
              "Please check your internate connection"
          );
          setLoading(false);
        });
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return "Loading ...";
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {typeof error === "string" ? error : JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div className="whole_container">
      <div className="container">
        <div className="docstram_logo">
          <span>Doc</span>
          <span className="dical">Stream</span>
        </div>
        <h2 className="head">
          {transactionDetails ? "Payment Successfull" : "Transaction Not found"}
        </h2>
        {transactionDetails && (
          <div className="appointment" id="appointment">
            <div className="appointment-header">
              <h4 className="appointment-title" id="app_title">
                Apppointment Receipt
              </h4>
            </div>
            <div className="appointment-body">
              <p>
                <strong>Payer Name:</strong> {transactionDetails.fname}{" "}
                {transactionDetails.lname}
              </p>
              <p>
                <strong>Email:</strong> {transactionDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {transactionDetails.phone}
              </p>
              <p>
                <strong>Amount Paid:</strong> {transactionDetails.amount}{" "}
                {transactionDetails.currency}
              </p>
              <p>
                <strong>Transaction Reference:</strong>{" "}
                {transactionDetails.tx_ref}
              </p>
            </div>
            <div className="appointment-footer">
              <button onClick={handlePrint} className="btn btn-primary">
                Print Receipt
              </button>
            </div>
            <div className="hint">
            <FaStarOfLife />
            <em><i>we will send you an email once the appoinment is approved (in 24hrs)</i></em>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
