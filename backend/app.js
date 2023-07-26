const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: "backend/config/config.env" })
const cors = require("cors")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

//routes
const post = require("./routes/post");
const user = require("./routes/user")


//using routes
app.use("/api/v1", post)
app.use("/api/v1", user)

module.exports = app;
