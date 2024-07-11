const express = require("express");
const { userLogIn, userSignUp, userLogOut, home, checkAuth } = require("../controllers/user");
const authMiddleWare = require("../middleware/authMiddleware");
const authRoute = express.Router();

authRoute.post("/me", authMiddleWare, checkAuth);


module.exports = authRoute;
