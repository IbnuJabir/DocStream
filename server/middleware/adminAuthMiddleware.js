const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.adt;
  if (token) {
    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.status(401).json({ error: "No authorithy for this access" });
      } else {
        next();
      }
    });
  } else {
    // console.log("token not found")
    res.status(401).json({ error: "No authorithy for this access" });
  }
};

module.exports = authMiddleWare;
