import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.TOKEN_SECRET;

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCart = await Cart.create({});
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      cart: newCart,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userFound = await User.findById(req.user.id); // Obtener ID desde el token JWT o sesión

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    // Actualizar los datos del usuario
    userFound.username = username || userFound.username;
    userFound.email = email || userFound.email;

    await userFound.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });

    // const userFound = await User.findById(req.user.id);
    // if (!userFound) return res.status(400).json({ message: "User not found" });

    // return res.json({
    //   id: userFound._id,
    //   username: userFound.username,
    //   email: userFound.email,
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secretKey, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const update = async (req, res) => {
  let newDataForOurUser = req.body;

  if (newDataForOurUser.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newDataForOurUser.password, salt);

    newDataForOurUser.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      newDataForOurUser,
      { new: true }
    ).select("-password");

    res.json({
      msg: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "There was an error updating the user.",
    });
  }
};
