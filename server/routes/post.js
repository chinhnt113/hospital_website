const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const posts = req.body; // Array of objects containing posts

  // Simple validation
  if (!Array.isArray(posts) || posts.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or empty array of posts" });
  }

  try {
    const newPosts = [];

    // Loop through each post in the array
    for (let i = 0; i < posts.length; i++) {
      const { title, image, snippet, content, majority, url_title } = posts[i];

      // Validate each post
      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: `Title is required for post at index ${i}` });
      }

      const newPost = new Post({
        title,
        image,
        snippet,
        content,
        majority,
        url_title
      });

      await newPost.save();
      newPosts.push(newPost);
    }

    res.json({ success: true, message: "Posts created successfully", posts: newPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/posts
// @desc Read post
// @access Public
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find({ user: req.userId }).populate("user", [
//       "username",
//     ]);
//     res.json({ success: true, posts });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

router.get("/", async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1;
  const { majority } = req.query;

  try {
    const totalCount = await Post.countDocuments({ majority: majority });

    const posts = await Post.find({ majority: majority })
      .select("-content")
      .skip((perPage * page) - perPage)
      .limit(perPage);

    res.json({
      success: true,
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalCount / perPage)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/find-post", async (req, res) => {
  const { url_title } = req.query;
  try {
    const post = await Post
      .findOne({ url_title: url_title })
    res.json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get('/search', async (req, res) => {
  const keyword = req.query.keyword;
  const posts = await Post.find({ title: { $regex: keyword, $options: 'i' } });
  res.json({ success: true, posts });
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorized to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "User not authorized or post not found",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };

    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorized to update post or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "User not authorized or post not found",
      });

    res.json({
      success: true,
      message: "Delete successfully!",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
