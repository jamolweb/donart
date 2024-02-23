const authRouter = require("express").Router();
const {
  register,
  login,
  autoLogin,
} = require("../controllers/auth-controller");

// REGISTER
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/autologin", autoLogin);

module.exports = authRouter;
