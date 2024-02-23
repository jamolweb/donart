const { Router } = require("express");
const isAdmin = require("../controllers/isAdmin-controller");

const adminRouter = Router();

adminRouter.post("/", isAdmin);

module.exports = adminRouter;
