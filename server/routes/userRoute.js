const express = require("express");
const {
  userLogIn,
  userSignUp,
  userLogOut,
  checkAuth,
} = require("../controllers/user");
const authMiddleWare = require("../middleware/authMiddleware");
const userRoute = express.Router();

userRoute.post("/login", userLogIn);
userRoute.get("/logout", userLogOut);
userRoute.post("/signup", userSignUp);
userRoute.get("/checkUserAuth", authMiddleWare, checkAuth);


module.exports = userRoute;
