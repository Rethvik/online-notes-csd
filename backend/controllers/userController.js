const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const tokenCreation = require("../utils/tokenGenerator");
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user exists");
  }
  const salt = await bcrypt.genSalt(5);
  password = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password });
  if (user) {
    console.log(user);
    res.status(201).json({
      name: user.name,
      token: tokenCreation(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});
const authUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    const match = await bcrypt.compare(password, userExists.password);
    if (match) {
      res.json({ token: tokenCreation(userExists._id), name: userExists.name });
    } else {
      throw new Error("Password Invalid");
    }
  } else {
    res.status(400);
    throw new Error(
      "User doesn't exist! Register by clicking on Register Here below"
    );
  }
});
module.exports = { registerUser, authUser };
