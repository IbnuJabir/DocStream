import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./PaymentSuccess.css";
import axios from "axios";
import { FaStarOfLife } from "react-icons/fa6";
import { getTransactionDetails } from "../../state/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { isLoading, transactionDetails, error } = useSelector(
    (state) => state.transactions
  );

  const tx_ref = searchParams.get("tx_ref");
  console.log("tx_ref", tx_ref);
  const transDetail = async () => {
    const result = await dispatch(getTransactionDetails(tx_ref));
    console.log('result', result)
  }
  useEffect(() => {
    transDetail()
  }, []);


  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return "Loading ...";
  }

  if (error) {
    console.log(error)
    return <div className="alert alert-danger">{error.error}</div>;
  }

  return (
    <div className="whole_container">
      <div className="payment_container">
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
              <em>
                <i>
                  we will send you an email once the appoinment is approved (in
                  24hrs)
                </i>
              </em>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
