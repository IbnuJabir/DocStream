const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.adt;
  if (token) {
    jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ error: "No authorithy for this access" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: "No authorized token found" });
  }
};

module.exports = authMiddleWare;
