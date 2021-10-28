const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { notFound, errorHandler } = require("./middlewares/index");
const isAuth = require("./middlewares/isAuth");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.json({
    message: "Hello 👋",
  });
});

app.get("/dashboard", isAuth, (req, res) => {
  res.json({
    success: true,
    userId: req.userId,
  });
});

app.use("/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((error) => console.error(error));
