const express = require("express");
const UserController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authentication.middleware");
const validObjectId = require("../middleware/validadeId.middleware");
const router = express.Router();

router.get("/all", verifyToken, UserController.all);
router.get("/:id", UserController.findOneById);
router.get("/:id/friends", UserController.getUserFriends);
router.put("/:id/friendId", UserController.addRemoveFriend);
router.delete("/:id",verifyToken, validObjectId ,UserController.deleted);

module.exports = router;
