const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const generateAccessToken = (user) =>
  jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

const handleServerError = (res, error, message) => {
  console.error(`${message}:`, error);
  res.status(500).json({ error: "Internal Server Error" });
};

const register = async (req, res) => {
  const { fullName, number, password } = req.body;

  try {
    const existingUser = await User.findOne({ number });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Siz kiritgan nomerga account allaqachon ochilgan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      number,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    res.status(201).json({
      message: "User registered successfully",
      newUser,
      loggedIn: { message: "User logged in successfully", accessToken },
    });

  } catch (error) {
    handleServerError(res, error, "Error during registration");
  }
};

const login = async (req, res) => {
  try {
    const { number, password } = req.body;
    const user = await User.findOne({ number });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Nimadurni noto'gri kiritgansiz" });

    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken, user });
  } catch (error) {
    handleServerError(res, error, "Error during login");
  }
};

const autoLogin = async (req, res) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(
        accessToken.split(" ")[1],
        process.env.SECRET_KEY
      );
      const existingUser = await User.findById(decodedToken._id);

      if (!existingUser) {
        return res.status(401).json({ error: "User not found" });
      }

      res
        .status(200)
        .json({ message: "Auto login successful", user: existingUser });
    } catch (err) {
      console.error(err);
      res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    handleServerError(res, error, "Error during auto login");
  }
};

module.exports = { login, register, autoLogin };
