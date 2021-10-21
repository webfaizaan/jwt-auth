const validate = require("../validations/auth");

const register = async (req, res, next) => {
  try {
    const value = await validate.register(req.body);

    res.json({ message: "Success" });
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
