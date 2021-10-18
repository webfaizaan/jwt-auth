const register = (req, res, next) => {
  res.json({ message: "Register Route" });
};

const login = (req, res, next) => {
  res.json({ message: "Login Route" });
};

module.exports = { register, login };
