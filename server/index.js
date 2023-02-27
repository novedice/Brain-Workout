require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const models = require("./models/models");
const ErrorHandlingMiddleware = require("./middleware/ErrorHandlingMiddleware");
const sequelize = require("./db");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: ["https://brain-workout.netlify.app", "http://localhost:8080", "*"],
    credentials: true,
    // preflightContinue: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.use(ErrorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
