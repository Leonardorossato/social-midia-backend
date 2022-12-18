const express = require("express");
const PostController = require("../controllers/post.controller");
const router = express.Router();

router.get("/all", PostController.all);
router.post("/create", PostController.create);
router.get("/:userId/posts", PostController.getUserPosts);
router.put("/:id/like", PostController.likePosts);

module.exports = router;
