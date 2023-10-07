const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

const AuthRoutes = require('./routes/AuthRoutes')

const app = express();

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use(AuthRoutes)



app.use((error, req, res, next) => {
  console.log(error);
  if (error.httpStatusCode === 422) {
    res.json({ Error: "Server error 422" });
  }
    res.json({ Error: "Server error 500" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB, Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));