const Transaction = require("../models/Transaction"); // Import TicketTransaction model
const Appointment = require("../models/Appointment"); // Import TicketTransaction model
// const { SendEmail } = require("../services/sendEmail");
const axios = require("axios");
const Chapa = require("chapa-nodejs").Chapa;
require("dotenv").config();

const chapa = new Chapa({
  secretKey: process.env.API_KEY,
});
const CHAPA_URL =
  process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_SECRET_KEY;
const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
  },
};

const createPayment = async (req, res) => {
  // a unique reference given to every transaction
  const TEXT_REF = await chapa.generateTransactionReference();

  const publicUrl = process.env.BACKEND_URL; // Replace with your actual Localtunnel URL
  const frontEndUrl = process.env.FRONTEND_URL;
  // const CALLBACK_URL = "http://localhost:4000/payment/verifypayment";
  // const return_url = `http://localhost:3000/payment/success?tx_ref=${TEXT_REF}`;

  const CALLBACK_URL = `${publicUrl}/payment/verifypayment/`;
  const return_url = `${frontEndUrl}/payment/success?tx_ref=${TEXT_REF}`;

  const { firstName, lastName, email, phone, _id: appointmentId } = req.body;

  const data = {
    amount: "100",
    currency: "ETB",
    email: email,
    first_name: firstName,
    last_name: lastName,
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + `${TEXT_REF}-${appointmentId}`,
    return_url: return_url,
  };
  try {
    const result = await axios.post(CHAPA_URL, data, config);
    const paymentData = JSON.parse(result.config.data);
    // console.log(paymentData);
    const appointmentTransaction = new Transaction({
      appointmentId: appointmentId,
      email: email,
      phone: phone,
      fname: firstName,
      lname: lastName,
      currency: data.currency,
      tx_ref: TEXT_REF,
      amount: data.amount,
      status: "pending",
    });
    await appointmentTransaction.save();

    // res.status(200).json({ result, TEXT_REF });

    res.json({
      paymentData: paymentData,
      status: result.data.status,
      appointmentId: appointmentId,
      checkout_url: result.data.data.checkout_url,
    });
    // res.json(paymentData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }

  // res.json({
  //   paymentData: paymentData,
  //   status: result.data.status,
  //   appointmentId: appointmentId,
  //   checkout_url: result.data.data.checkout_url,
  // });
  // })
  // .catch((err) => console.log(err));
};

const verifyPayment = async (req, res) => {
  //   const { appointmentId, status } = req.body;
  const id = req.params.id;
  const parts = id.split("-");
  const tx_ref = parts.slice(0, 2).join("-");
  const appointmentId = parts[2];
  console.log("payment verifying...");
  console.log("from payment verify: "+tx_ref);
  //verify the transaction
  try {
    const response = await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + tx_ref,
      config
    );
    console.log("verify response status: " + response.status);
    if (response.status === 200) {
      const appointment = await Appointment.findOne({ _id: appointmentId });
      if (appointment) {
        appointment.status = "paid";
        appointment.tx_ref = tx_ref;
        await appointment.save();
        console.log("Payment successfully verified and appointment updated");
      } else {
        console.log("Appointment not found");
        // res.status(404).send("Appointment not found");
      }
      const transaction = await Transaction.findOne({
        appointmentId: appointmentId,
      });
      if (transaction) {
        transaction.status = "paid";
        await transaction.save();
        console.log(" Transaction updated to paid");
      } else {
        console.log("Transaction not found");
        // res.status(404).send("Transaction not found");
      }
      res.status(200).send("Payment successfully verified and upto-dated");
    }
  } catch (error) {
    console.log("Payment can't be verfied", error);
    return res.status(404).json({ message: "Payment can't be verfied" });
  }
};

const paymentSuccess = async (req, res) => {
  console.log("verify success");
  return res.status(200).json({ message: "Payment verified successfully" });
};

module.exports = {
  createPayment,
  verifyPayment,
  paymentSuccess,
};
