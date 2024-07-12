const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const {
    getAllAppointments,
    getBookedAppointments,
    getSingleAppointment,
    addAppointment,
    approve,
    cancel,
} = require("../controllers/appointment");
const appoinmentRoute = express.Router();

appoinmentRoute.get("/getAll", getAllAppointments);
appoinmentRoute.get("/booked", getBookedAppointments);
appoinmentRoute.get("/:id", getSingleAppointment);
appoinmentRoute.post("/addNew", addAppointment);
appoinmentRoute.post("/approve", approve);
appoinmentRoute.post("/cancel", cancel);
// appoinmentRoute.get("/success", paymentSuccess);



module.exports = appoinmentRoute;
