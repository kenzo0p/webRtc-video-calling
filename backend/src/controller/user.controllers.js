import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import crypto from "crypto"
export const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User alreadu exist" });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashPassword,
    });
    await newUser.save();
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error while registering the user");
    return res.status(500).json("Internal server error");
  }
};
export const login = async (req , res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Please provide username or password" });
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};
