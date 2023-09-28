const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createPost = async (req, res) => {
  try {
    // const file = req.files.image
    let url = "",
      public_id = "";

    // await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //   url = result.url
    //   public_id = result.public_id
    // })

    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: public_id,
        url: url,
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);
    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    await user.save();

    res.status(201).json({
      success: true,
      post,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await post.deleteOne({ _id: req.params.id });

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post Deleted",
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post Not Found" });

    const userId = req.user._id.toString();
    const likes = post.likes.map((like) => like._id.toString());

    if (likes.includes(userId)) {
      const index = likes.indexOf(userId);
      post.likes.splice(index, 1);
      await post.save();
      const updatedLikesCount = post.likes.length;
      return res
        .status(200)
        .json({ success: true, message: "Post Unliked", updatedLikesCount });
    } else {
      post.likes.push({ _id: req.user._id });
      await post.save();
      const updatedLikesCount = post.likes.length;
      return res
        .status(200)
        .json({ success: true, message: "Post Liked", updatedLikesCount });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "following",
      "posts"
    );
    user.following.push(user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        success: false,
        message: "Post Not Found",
      });

    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post Updated",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

exports.commentOnPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    let commentIndex = -1;

    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
    }

    await post.save();
    res.status(200).json({
      success: true,
      message: "Comment saved",
    });
  } catch (e) {
    console.error("Error saving comment:", e);
    res.status(500).json({
      success: false,
      error: "An error occurred while saving the comment",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId == undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment id is invalid",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      res.status(200).json({
        success: true,
        message: "selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "your Comment has Deleted",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: true,
      error: e.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      owner: {
        $in: req.user._id,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

exports.getLikedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ "likes._id": req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getRecommendation = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params._id;
    const post = await Post.findById(id);
    console.log("post:", post);
    res.status(200).json({
      success: true,
      post,
    });
  }
  catch (e) {

    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}