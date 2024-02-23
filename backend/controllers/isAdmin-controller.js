const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res) => {
  const { number, password } = req.body;

  try {
    const user = await User.findOne({ number });

    if (!user) {
      return res
        .status(403)
        .json({ isAdmin: false, message: "Admin panelga kirishda hatolik boldi nimadurni notorgi kiritilgan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid && user.role === "admin") {
      const accessToken = jwt.sign(
        { adminId: user._id, role: user.role, number: user.number, name: user.fullName },
        process.env.SECRET_KEY,
        { expiresIn: "10d" }
      );

      res
        .status(200)
        .json({ isAdmin: true, message: "Admin panelga muvafaqiyatli kirdingiz", accessToken });
    } else {
      res.status(403).json({ isAdmin: false, message: "Admin panelga kirishda hatolik bo'ldi nimadurni noto'rg'i kiritilgan" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ isAdmin: false, message: "Internal Server Error" });
  }
};

module.exports = isAdmin;
