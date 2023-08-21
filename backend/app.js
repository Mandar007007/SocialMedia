const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: "config/config.env" })
const cors = require("cors")
const fileUpload = require('express-fileupload')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(fileUpload({
  useTempFiles:true
}))

//routes
const post = require("./routes/post");
const user = require("./routes/user");


//using routes
app.use("/api/v1", post)
app.use("/api/v1", user)

module.exports = app;
