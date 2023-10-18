const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

const AuthRoutes = require("./routes/AuthRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(AuthRoutes);

app.use("/uploads", express.static(__dirname + "/uploads"));

app.post("/upload-by-link", async (req, res, next) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});



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
