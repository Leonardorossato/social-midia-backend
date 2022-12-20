const express = require("express");
const PostController = require("../controllers/post.controller");
const router = express.Router();

router.get("/all", PostController.all);
router.get("/:userId/posts", PostController.getUserPosts);
router.post("/create", PostController.create);
router.put("/:id/like", PostController.likePosts);
router.delete("/:id/:userId", PostController.deleted);

module.exports = router;
