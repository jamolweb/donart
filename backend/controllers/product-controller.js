const { default: mongoose } = require("mongoose");
const Product = require("../models/product.js");
const notAdminError = require("../errors/wrongTokenError.js");

// ! getProducts
const getProducts = async (req, res) => {
  try {
    await Product.find()
      .then((products) => res.status(200).json(products))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ! getProduct by id
const getProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Product not found" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ! createProduct
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    product
      .save()
      .then((result) =>
        res
          .status(201)
          .json({ successText: "Product successfully created", data: result })
      )
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ! updateProduct
const updateProduct = async (req, res) => {
  try {
    // Check product exists or not
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // update prooduct
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).then((product) =>
      res.status(200).json({
        message: "Product updated successfully",
        data: product,
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ! deleteProduct
const deleteProduct = async (req, res) => {
  try {
    // Check product exists or not
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // delete product
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
