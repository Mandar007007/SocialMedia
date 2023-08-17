const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment, getMyPosts, getLikedPosts } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated,createPost)
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost).delete(isAuthenticated,deletePost).put(isAuthenticated,updateCaption)
router.route("/posts").get(isAuthenticated,getPostOfFollowing)
router.route("/post/comment/:id").put(isAuthenticated,commentOnPost).delete(isAuthenticated,deleteComment)
router.route("/posts/me").get(isAuthenticated,getMyPosts)
router.route("/posts/liked").get(isAuthenticated,getLikedPosts)

module.exports = router