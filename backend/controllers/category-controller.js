const Category = require("../models/category");
const { default: mongoose } = require("mongoose");

// ! GET CATEGORYES
const getCategoryes = async (req, res) => {
  try {
    await Category.find().then((Categories) =>
      res.status(200).json(Categories)
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ! GET CATEGORY
const getCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ! CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      successText: "Category successfully created",
      newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ! UPDATE CATEGORY
const updateCategory = async (req, res) => {
  // ! checking category have or not
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "Category not found" });
  }
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res
      .status(200)
      .json({ success: true, successText: "Category successfully updated" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ! DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    // Check product exists or not
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "Category not found" });
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // delete category
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCategoryes, getCategory, createCategory, updateCategory, deleteCategory };
