const express = require("express");
const upload = require("../middleware/uploadAdmin");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const  { addAdmin, getAllAdmins, deleteAdmin, adminLogIn, adminSignUp, adminLogOut, checkAuth } = require("../controllers/admin");
const adminRoute = express.Router();

adminRoute.get("/getAll", getAllAdmins);
adminRoute.post("/addNew", upload.single("avatar"), addAdmin);
adminRoute.post("/login", adminLogIn);
adminRoute.get("/logout", adminLogOut);
// adminRoute.post("/signup", adminSignUp);
adminRoute.get("/checkUserAuth", adminAuthMiddleware, checkAuth);
module.exports = adminRoute;
