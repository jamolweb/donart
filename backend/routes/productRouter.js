const { Router } = require("express");
const { getProduct, getProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/product-controller");
const checkRole = require("../middleware/checkRole");
const auth = require("../middleware/auth");
const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", auth, checkRole, createProduct);
productRouter.put("/:id", auth, checkRole, updateProduct);
productRouter.delete("/:id", auth, checkRole, deleteProduct);

module.exports = productRouter;