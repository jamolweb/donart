const { Router } = require("express");
const checkRole = require("../middleware/checkRole");
const auth = require("../middleware/auth");
const {
  createCategory,
  getCategoryes,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category-controller");
const categoryRouter = Router();

categoryRouter.get("/", getCategoryes);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", auth, checkRole, createCategory);
categoryRouter.put("/:id", auth, checkRole, updateCategory);
categoryRouter.delete("/:id", auth, checkRole, deleteCategory);

module.exports = categoryRouter;
