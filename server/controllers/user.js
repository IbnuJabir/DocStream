const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ClientModel = require("../models/ClientModel");

const SECRET = process.env.TOKEN_SECRET;
const maxAge = 1 * 24 * 60 * 60; // has age of 1 day (24hrs)

const createToken = (id) => {
  return jwt.sign({ id }, SECRET, {
    expiresIn: maxAge,
  });
};

const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await ClientModel.findOne({ email: email });

    if (user) {
      // Compare the provided password with the stored hashed password
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ ...user.toObject(), isLogin: true });
      } else {
        return res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(400).json({ message: "Email doesn't exist" });
    }
  } catch (error) {
    // console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const userSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if a user with the given email or username already exists
    const existingUser = await ClientModel.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      if (existingUser.email === email && existingUser.username === username) {
        return res
          .status(400)
          .json({ message: "Email and Username already taken" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already existed" });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken" });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    // Create a new user if no user with the given email or username exists
    const newUser = await ClientModel.create(req.body);
    const token = createToken(newUser._id);
    // res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // console.log(newUser);
    res.status(201).json({ newUser });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ message: "Email already existed" });
      }
      if (error.keyPattern && error.keyPattern.username) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const home = async (req, res) => {
  console.log("home component");
  return res.status(200).json({ message: "Authenticated" });
};

const checkAuth = async (req, res) => {
  res.status(200).json("Authentic"); // Send user data as response
  // console.log("Authentic");
};

const userLogOut = async (req, res) => {
  console.log("user logged out");
  res.cookie("token", "", { maxAge: 1 });
  return res.status(200).json({ message: "user logged out" });
};

module.exports = { userLogIn, userSignUp, userLogOut, home, checkAuth };