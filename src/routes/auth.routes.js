const express = require("express");
const AuthController = require("../controllers/auth.controller");
const multer = require("multer");
const upload = multer({ storage: 'picture' });
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", upload.single("picture"), AuthController.register);

module.exports = router;
