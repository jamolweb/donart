const { Router } = require("express");
const { getOrders, getOrder, deleteOrder, createOrder } = require("../controllers/order-controller");
const orderRouter = Router();
const checkRole = require("../middleware/checkRole");
const auth = require("../middleware/auth");

orderRouter.get("/", auth, checkRole, getOrders);
orderRouter.get("/:id", auth, checkRole, getOrder);
orderRouter.post("/", createOrder);
orderRouter.delete("/:id", auth, checkRole, deleteOrder);

module.exports = orderRouter;