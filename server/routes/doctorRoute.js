const express = require("express");
const upload = require("../middleware/uploadDoctor");
const {getAllDoctors, addDoctor } = require("../controllers/doctor");
const doctorRoute = express.Router();

doctorRoute.get("/getAll", getAllDoctors);
doctorRoute.post("/addNew", upload.single("avatar"), addDoctor);

module.exports = doctorRoute;
