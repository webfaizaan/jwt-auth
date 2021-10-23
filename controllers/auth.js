const bcrypt = require("bcryptjs");

const validate = require("../validations/auth");
const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const value = await validate.register(req.body);

    const { name, email, password } = value;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      const error = new Error("Email already exists");
      error.status = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const savedUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, user: savedUser._id });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const value = await validate.login(req.body);

    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
