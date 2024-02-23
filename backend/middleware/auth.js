const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;

    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } else {
    return res.status(400).json({ message: "authorization required" });
  }
};

module.exports = auth;
