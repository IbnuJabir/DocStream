const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const {
    getAllAppointments,
    getAllAppointmentsWithInterval,
    getUsersAppointments,
    getBookedAppointments,
    getSingleAppointment,
    addAppointment,
    approve,
    suspend,
    contact,
} = require("../controllers/appointment");
const appoinmentRoute = express.Router();

appoinmentRoute.get("/getAll", getAllAppointments);
appoinmentRoute.get("/getAllAppointmentsWithInterval", getAllAppointmentsWithInterval);
appoinmentRoute.post("/getUsersAppointments", getUsersAppointments);
appoinmentRoute.get("/booked", getBookedAppointments);
appoinmentRoute.get("/:id", getSingleAppointment);
appoinmentRoute.post("/addNew", addAppointment);
appoinmentRoute.post("/approve", approve);
appoinmentRoute.post("/suspend", suspend);
appoinmentRoute.post("/contact", contact);
// appoinmentRoute.get("/success", paymentSuccess);



module.exports = appoinmentRoute;
