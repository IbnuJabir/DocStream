const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "No authorized token found" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "No authorithy for this access" });
    req.user = user;
    next();
  });
};

module.exports = authMiddleWare;