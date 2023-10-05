const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment, getMyPosts, getLikedPosts, getRecommendation, getLikedOfProuser } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost)
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost).delete(isAuthenticated, deletePost).put(isAuthenticated, updateCaption)
router.route("/posts/following").get(isAuthenticated, getPostOfFollowing)
router.route("/post/comment/:id").put(isAuthenticated, commentOnPost).delete(isAuthenticated, deleteComment)
router.route("/posts/me").get(isAuthenticated, getMyPosts)
router.route("/posts/liked").get(isAuthenticated, getLikedPosts)
router.route("/posts/recommendation").get(isAuthenticated, getRecommendation)
router.route("/posts/getLikedOfPro/:id").get(isAuthenticated,getLikedOfProuser)

module.exports = router