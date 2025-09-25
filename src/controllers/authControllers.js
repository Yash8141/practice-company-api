import Login from "../models/Login.js";
import Employee from "../models/Employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createLogin = async (req, res, next) => {
  try {
    const { username, password, employeeId } = req.body;
    const login = new Login({
      username,
      password,
      employee: employeeId || undefined,
    });
    await login.save();

    // if employeeId provided, update employee login
    if (employeeId) {
      await Employee.findByIdAndUpdate(employeeId, { login: login._id });
    }
    res.status(201).json({ message: "Login successfully", login: login._id });
  } catch (error) {
    next(error);
  }
};

export const doLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1. Find user by username
    const user = await Login.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, employeeId: user.employee },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
