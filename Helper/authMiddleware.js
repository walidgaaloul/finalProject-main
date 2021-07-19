const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

const authMiddleware = (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "you are not authorized" });
  } 
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {throw err;}
      req.userId = payload.userId;
      next();
    });
 
};
module.exports = authMiddleware;