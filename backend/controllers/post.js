const { post } = require("../app")
const Post = require("../models/Post")
const User = require("../models/User")

exports.createPost = async(req,res) => {
    try{

        const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:"sample id",
                url:"sample url"
            },
            owner:req.user._id
        }

        const post = await Post.create(newPostData)
        const user = await User.findById(req.user._id)

        user.posts.push(post._id)

        await user.save()


        res.status(201).json({
            success:true,
            post
        })

    }catch(e){
        res.status(500).json({
            success:false,
            error:e.message
        })
    }

}

exports.deletePost = async (req,res,next) => {
  try{

    const post = await Post.findById(req.params.id)
    
    if(!post)
    {
      return res.status(404).json({success:false,message:"Post Not Found"})
    }


    if(post.owner.toString() !== req.user._id.toString())
    {
      return res.status(401).json({success:false,message:"Unauthorized"})

    }

    await post.deleteOne({_id:req.params.id})

    const user = await User.findById(req.user._id)

    const index = user.posts.indexOf(req.params.id)

    user.posts.splice(index,1);

    await user.save();

    res.status(200).json({
      success:true,
      message:"Post Deleted"
    })

  }catch(e)
  {
    res.status(500).json({success:false,message:e.message})
  }
}

exports.likeAndUnlikePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) return res.status(404).json({ message: "Post Not Found" });
  
      const userId = req.user._id.toString();
      const likes = post.likes.map(like => like._id.toString());
  
      if (likes.includes(userId)) {
        const index = likes.indexOf(userId);
        post.likes.splice(index, 1);
        await post.save();
        return res.status(200).json({ success: true, message: "Post Unliked" });
      } else {
        post.likes.push({ _id: req.user._id });
        await post.save();
        return res.status(200).json({ success: true, message: "Post Liked" });
      }
    } catch (e) {
      res.status(500).json({ success: false, message: e.message });
    }
  };
  

  exports.getPostOfFollowing = async (req,res,next) => {
    try{
      const user = await User.findById(req.user._id).populate("following","posts");
      const posts = await Post.find({
        owner:{
          $in : user.following
        }
      })

      res.status(200).json({
        success:true,
        posts
      })

    }catch(e)
    {
      res.status(500).json({
        success:false,
        message:e.message
      })
    }
  }

  exports.updateCaption = async (req,res) => {
    try{

      const post = await Post.findById(req.params.id);

      if(!post) return res.status(400).json({
        success:false,
        message:"Post Not Found"
      })

      if(post.owner.toString() !== req.user._id.toString())
      {
        res.status(400).json({
          success:false,
          message:"Unauthorized"
        })
      }

      post.caption = req.body.caption
      await post.save()

      res.status(200).json({
        success:true,
        message:"Post Updated"
      })

    }catch(e)
    {
      res.status(500).json({
        success:false,
        error:e.message
      })
    }
  }