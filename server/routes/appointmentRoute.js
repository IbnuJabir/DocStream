const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");
const {
    getAllAppointments,
    getBookedAppointments,
    getSingleAppointment,
    addAppointment,
    approve,
    suspend,
} = require("../controllers/appointment");
const appoinmentRoute = express.Router();

appoinmentRoute.get("/getAll", getAllAppointments);
appoinmentRoute.get("/booked", getBookedAppointments);
appoinmentRoute.get("/:id", getSingleAppointment);
appoinmentRoute.post("/addNew", addAppointment);
appoinmentRoute.post("/approve", approve);
appoinmentRoute.post("/suspend", suspend);
// appoinmentRoute.get("/success", paymentSuccess);



module.exports = appoinmentRoute;
