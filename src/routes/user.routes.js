const express = require("express");
const UserController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authentication.middleware");
const router = express.Router();

router.get("/all", verifyToken, UserController.all);
router.get("/:id", UserController.findOneById);
router.get("/friends/:id", UserController.getUserFriends);
router.put("/:id/friendId", UserController.addRemoveFriend);
router.delete("/:id", UserController.deleted);

module.exports = router;
