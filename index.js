const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Hello 👋",
  });
});

const port = process.env.PORT || 1337;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((error) => console.error(error));
