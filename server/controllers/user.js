const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ClientModel = require("../models/ClientModel");

const SECRET = process.env.TOKEN_SECRET;
const maxAge = 1 * 24 * 60 * 60; // has age of 1 day (24hrs)

const createToken = (id, email) => {
  return jwt.sign({ id, email }, SECRET, {
    expiresIn: maxAge,
  });
};
const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await ClientModel.findOne({ email });

    if (user) {
      // Compare the provided password with the stored hashed password
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id, user.email);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // maxAge in milliseconds
          sameSite: 'None',
          secure: true, // Ensure the cookie is only sent over HTTPS
        });
        return res.status(200).json({ email: user.email, isLogin: true });
      } else {
        return res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(400).json({ message: "Email doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
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
    const token = createToken(newUser._id, newUser.email);
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

const checkAuth = async (req, res) => {
  const { email } = req.user;
  res.status(200).json({ userEmail: email, message: "Authentic user" }); // Send user data as response
};

const userLogOut = async (req, res) => {
  console.log("user logged out");
  res.cookie("token", "", 
             {  httpOnly: true,
                maxAge: 1, // maxAge in milliseconds
                sameSite: 'None',
                secure: true, // Ensure the cookie is only sent over HTTPS);
              }
  return res.status(200).json({ message: "user logged out" });
};

module.exports = { userLogIn, userSignUp, userLogOut, checkAuth };
