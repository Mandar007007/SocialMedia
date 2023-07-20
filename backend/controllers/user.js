const Post = require("../models/Post");
const User = require("../models/User");
const {sendEmail} = require("../middlewares/sendEmail")
const crypto = require("crypto")


exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      let user = await User.findOne({ email });
  
      if (user) return res.status(500).json({ success: false, msg: "User already exists" });
  
      user = await User.create({ name, email, password, avatar: { public_id: "sample", url: "sample" } });
  
      const token = await user.generateToken();

      res.status(200).cookie("token",token,{expires:new Date(Date.now()+1*24*60*60*1000),httpOnly:true}).json({
          success:true,
          user,
          token
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  };
  
  exports.login = async (req,res) => {
    try{

        const {email,password} = req.body;

        if(!email || !password) res.status(500).json({
            success:false,message:"Enter Credentials"
        })

        const user = await User.findOne({email}).select("+password")


        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch)
        {
            return res.status(400).json({
                success:false,
                message:"Incorrect Credentials"
            })
        }

        const token = await user.generateToken();

        res.status(200).cookie("token",token,{expires:new Date(Date.now()+1*24*60*60*1000),httpOnly:true}).json({
            success:true,
            user,
            token
        })

    }catch(e)
    {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
  }

  exports.logout = async (req,res,next) => {
    try{

        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"Logged Out"
        })

    }catch(e)
    {
        res.status(500).json({success:false,error:e.message})
    }
  }

  exports.followUser = async (req, res) => {
    try {
      const userToFollow = await User.findById(req.params.id);
      const loggedInUser = await User.findById(req.user._id.toString());
  
      if (!userToFollow) {
        return res.status(400).json({ success: false, message: "User Not Found" });
      }
  
      if (loggedInUser.following.includes(userToFollow._id)) {
        const indexOfFollowing = loggedInUser.following.indexOf(userToFollow._id);
        loggedInUser.following.splice(indexOfFollowing, 1);
  
        const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
        userToFollow.followers.splice(indexFollowers, 1);
  
        await loggedInUser.save();
        await userToFollow.save();
  
        res.status(200).json({ success: true, message: "Unfollowed" });
      } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
  
        await loggedInUser.save();
        await userToFollow.save();
  
        res.status(200).json({ success: true, message: "Followed Successfully" });
      }
    } catch (e) {
      res.status(500).json({ success: false, message: e.message });
    }
  };

  exports.updatePassword = async (req,res) => {
    try{
        const user = await User.findById(req.user._id).select("+password")

        const {oldPassword,newPassword} = req.body
        const isMatch = await user.matchPassword(oldPassword);

        if(!oldPassword || !newPassword) res.status(400).json({success:false,message:"Enter required fields"})

        if(!isMatch) res.status(400).json({success:false,message:"Invalid old Password"})

        user.password = newPassword;
        await user.save();

        res.status(200).json({
          success:false,
          message:"Password Updated"
        })

    }catch(e){
        res.status(500).json({
            success:true,
            error:e.message
        })
    }
  }


  exports.updateProfile = async(req,res) => {
    try{
      const user = await User.findById(req.user._id)
      const {name,email} = req.body

      if(name)
      {
        user.name = name
      }
      if(email)
      {
        user.email = email
      }

      await user.save()
      
      res.status(200).json({
        success:true,
        message:"Profile Updated"
      })

    }catch(e)
    {
      res.status(400).json({
        success:false,
        message:e.message
      })
    }
  }

  exports.deleteMyProfile = async (req,res,next) => {
    try{

      const user = await User.findById(req.user._id)
      const posts = user.posts
      const followers = user.followers.map(follower => follower._id.toString())
      const userId = user._id.toString()

      //Logout after delete

      res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
      })

      for(let i = 0 ; i < posts.length ; i++)
      {
        await Post.deleteOne({_id:posts[i]})
      }

      //removing this user from everyone's following
      for(let i = 0 ; i < followers.length ; i++)
      {
          const follower = await User.findById(followers[i]);
          const index = follower.following.indexOf(userId);
          follower.following.splice(index,1);
          await follower.save();
      }
      await User.deleteOne({_id:user._id})
      res.status(200).json({
        success:true,
        message:"user deleted"
      })

    }catch(e)
    {
      res.status(500).json({
        success:false,
        error:e.message
      })
    }
  }
  

  exports.myProfile = async(req,res) => {
    try{

      const user = await User.findById(req.user._id).populate("posts");

      res.status(200).json({
        success:true,
        user,
      })

    }catch(e)
    {
      res.status(500).json({
        success:false,
        error:e.message
      })
    }
  }

  exports.forgotPassword = async (req,res) => {
    try{

      const user = await User.findOne({email:req.body.email})

      if(!user)
      {
        return res.status(404).json({
          success:false,
          message:"User Not Found"
        })
      }

      const resetPasswordToken = user.getResetPasswordToken();

      const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`;
      const message = `Reset Your Password By Clicking On the LINK BELOW:\n\n${resetUrl}`;

      try{

        await sendEmail({email:req.body.email,
        subject:"Reset Password",
        message
      })
      res.status(200).json({
        success:true,
        message:`Email Sent To ${req.body.email}`
      })
      }catch(e)
      {
        user.resetPasswordExpire = undefined
        user.resetPasswordToken = undefined
        await user.save({validateBeforeSave:false})

        res.status(500).json({
          success:false,
          message:e.message
        })

      }

      await user.save();



    }catch(e)
    {
      res.status(500).json({
        success:false,
        error:e.message
      })
    }
  }

  exports.resetPassword = async (req,res) => {
      try{
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})
        if(!user) return res.status(401).json({
          success:false,
          message:"Not A User"
        })

        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined

        await user.save();

          res.status(200).json({
            success:true,
            message:"Password reset successfully"
          })

      }catch(e)
      {
        res.status(500).json({
          success:false,
          message:e.message
        })
      }

  }


  exports.getAllUsers = async(req,res) => {
    try{

      const users = await User.find()

      res.status(200).json({
        success:true,
        users
      })

    }catch(e)
    {
      res.status(500).json({
        success:false,
        error:e.message
      })
    }
  }