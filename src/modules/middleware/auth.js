const jwt = require('jsonwebtoken');
const config = proccess.env;
const User = require('../../../models');
const jwtMiddleware = (socket, next) => {
    const { token, user_id } = socket.handshake.query;
    console.log("token", token);
    console.log("user_id", user_id);
    if (token) {
      try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        user_id = decoded.user_id;
        next();
      } catch (err) {
        return next(new Error("unauthorized event"));
      }
    } else {
      return next(new Error("No Token Provided"));
    }
  };
  
  const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user_id = decoded.user_id;
      if (req.params.user_id != req.user_id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
  };
  
  module.exports = { verifyToken, jwtMiddleware, loginMiddleware };