const { Router } = require("express");
const checkRole = require("../middleware/checkRole");
const auth = require("../middleware/auth");
const {
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/user-controller");
const userRouter = Router();

userRouter.get("/", auth, checkRole, getUsers);
userRouter.get("/:id", auth, checkRole, getUser);
userRouter.put("/:id", auth, checkRole, updateUser);
userRouter.delete("/:id", auth, checkRole, deleteUser);

module.exports = userRouter;