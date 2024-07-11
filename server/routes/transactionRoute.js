const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const {getAllTransactions, getSingleTransaction, getTotalRevenue}  = require('../controllers/transaction')
const transactionRoute = express.Router();


transactionRoute.get("/getAll", getAllTransactions);
transactionRoute.get("/revenue", getTotalRevenue);
transactionRoute.get("/:tx_ref", getSingleTransaction);


module.exports = transactionRoute;
