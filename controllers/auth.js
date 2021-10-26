const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
      { id: savedUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    res.status(201).json({ success: true, token });
  } catch (error) {
    if (error.name === "ValidationError") error.status = 422;

    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const value = await validate.login(req.body);

    const { email, password } = value;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("Email doesn't exists");
      error.status = 400;
      return next(error);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      const error = new Error("Password is wrong");
      error.status = 400;
      return next(error);
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    if (error.name === "ValidationError") error.status = 422;

    next(error);
  }
};

module.exports = { register, login };
