const User = require("../models/User")
const jwt = require("jsonwebtoken")



exports.isAuthenticated = async(req,res,next) => {


    const {token} = req.cookies;

    if(!token){
        return res.status(402).json({message:"Please Login First"})
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decoded._id);

    next();
}