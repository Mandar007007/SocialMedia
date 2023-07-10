const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
require("dotenv").config({path:"backend/config/config.env"})


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//routes
const post = require("./routes/post");
const user = require("./routes/user")


//using routes
app.use("/api/v1",post)
app.use("/api/v1",user)

module.exports = app;
