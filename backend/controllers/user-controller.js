const { default: mongoose } = require("mongoose");
const User = require("../models/user");

// ! GET USERS
const getUsers = async (req, res) => {
  try {
    User.find().then((users) => res.status(200).json(users));
  } catch (error) {
    console.log("error with getting users:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ! GET USER
const getUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error with getting users:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ! UPDATE USER
const updateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndUpdate(req.params.id, req.body).then(() => res.status(200).json({ success: true, message: "User updated successfully" })
    );
  } catch (error) {
    console.log("error with getting user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ! DELETE CATEGORY
const deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted seccussully" });
  } catch (error) {
    console.log("error with deleting user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };