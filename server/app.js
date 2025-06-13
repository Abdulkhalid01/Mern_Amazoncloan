const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");

const Products = require("./moduls/productSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://mern-amazoncloan.vercel.app",
    credentials: true,
  })
);
app.use(router);

const port = process.env.PORT || 8005;


app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});

DefaultData();
