const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    try {

      const { token } = req.cookies;
      
      if (!token) {
        return res.status(401).json({
            success:false,
            message:"Login First"
        })
      } else {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).exec();
      }
  
      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: error.message,
      });
    }
  };
