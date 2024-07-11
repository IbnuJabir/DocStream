const express = require("express");
const upload = require("../middleware/uploadDepartment");
const {getAllDepartments, addDepartment, deleteDepartment, updateDepartment } = require("../controllers/department");
const departmentsRoute = express.Router();

departmentsRoute.get("/getAll", getAllDepartments);
departmentsRoute.post("/addNew", upload.single("image"), addDepartment);
departmentsRoute.post("/delete", deleteDepartment);
departmentsRoute.post("/update", updateDepartment);

module.exports = departmentsRoute;
