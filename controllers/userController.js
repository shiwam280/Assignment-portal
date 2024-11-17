import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send({ message: "Invalid credentials." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send({ message: "Invalid Password." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const admins = async (req, res) => {
  try {
    const allAdmins = await User.find({ role: "Admin" });
    res.status(201).json(allAdmins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
