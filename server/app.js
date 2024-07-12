const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

/*######## Routes ############## */

const userRoute = require("./routes/userRoute");
const paymentRoute = require("./routes/paymentRoute");
const appoinmentRoute = require("./routes/appointmentRoute");
const transactionRoute = require("./routes/transactionRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoute = require("./routes/AdminRoute");
const unAvailableDatesRoute = require("./routes/unAvailableDatesRoute");
const departmentsRoute = require("./routes/deparmentsRoute");
// const authRoute = require("./routes/authRoute");

//########

const ClientModel = require("./models/ClientModel");
const Appointment = require("./models/Appointment");
const authMiddleWare = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/appointment", appoinmentRoute);
app.use("/payment", paymentRoute);
app.use("/transactions", transactionRoute);
app.use("/doctor", doctorRoute);
app.use("/admin", adminRoute);
app.use("/unAvailableDates", unAvailableDatesRoute);
app.use("/departments", departmentsRoute);

const PORT = process.env.PORT || 4000;
mongoose
  .connect("mongodb://127.0.0.1:27017/client", {})
  .then(() => {
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));