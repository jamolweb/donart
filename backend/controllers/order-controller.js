const Order = require("../models/order");
const { default: mongoose } = require("mongoose");

const getOrders = async (req, res) => {
  try {
    Order.find()
      .then((orders) => res.status(200).json(orders))
      .catch((error) => res.status(500).json({ error: error.message }));
  } catch (error) {
    console.log("error with get orders. error:", error);
    res.status(500).json({ error: error.message });
  }
};
const getOrder = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Order not found" });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only send the response here, not in the catch block
    res.status(200).json(order);
  } catch (error) {
    // Handle errors, but don't send a response here
    res.status(500).json({ error: error.message });
  }
};


const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);

    order
      .save()
      .then((result) =>
        res
          .status(201)
          .json({ successText: "Order successfully created", data: result })
      )
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Order not found" });
  }
  try {
    const order = Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({ error: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order successfully deleted" });
  } catch (error) {
    console.error("error with deleting order: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getOrders,
  getOrder,
  deleteOrder,
  createOrder,
};
