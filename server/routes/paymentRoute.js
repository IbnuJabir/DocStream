const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const {
  createPayment,
  verifyPayment,
  paymentSuccess,
} = require("../controllers/payment");
const paymentRoute = express.Router();


paymentRoute.post("/createpayment", createPayment);
paymentRoute.get("/verifypayment/:id", verifyPayment);
paymentRoute.get("/success", paymentSuccess);


module.exports = paymentRoute;
