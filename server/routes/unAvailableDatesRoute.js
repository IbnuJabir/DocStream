const express = require("express");
const {getAllUnAvailableDates, addUnAvailableDates, deleteUnAvailableDate, updateUnAvailableDate } = require("../controllers/unAvailableDates");
const unAvailableDatesRoute = express.Router();

unAvailableDatesRoute.get("/getAll", getAllUnAvailableDates);
unAvailableDatesRoute.post("/addNew", addUnAvailableDates);
unAvailableDatesRoute.post("/delete", deleteUnAvailableDate);
unAvailableDatesRoute.post("/update", updateUnAvailableDate);

module.exports = unAvailableDatesRoute;
