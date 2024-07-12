const Transaction = require("../models/Transaction");
const axios = require("axios");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "paid" }).sort({
      createdAt: -1,
    });

    if (!transactions || transactions.length === 0) {
      console.log("No Completed Transaction Found");
      return res.status(404).send("No Completed Transaction Found");
    }

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching Transaction:", error);
    return res.status(500).send("Server error");
  }
};

const getSingleTransaction = async (req, res) => {
  const { tx_ref } = req.params;
  console.log("from getSingleTransaction: " + tx_ref);
  try {
    const transaction = await Transaction.findOne({
      tx_ref: tx_ref,
      status: "paid",
    });
    if (!transaction) {
      return res.status(400).json({ error: "Paid Transaction Not Found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalRevenue = async (req, res) => {
  let totalRevenue = 0;
  try {
    const transactions = await Transaction.find({ status: "paid" });
    totalRevenue = transactions.reduce((sum, trx) => sum + trx.amount, 0);
    res.status(200).json(totalRevenue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while calculating total revenue." });
  }
};

module.exports = {
  getAllTransactions,
  getSingleTransaction,
  getTotalRevenue,
};
