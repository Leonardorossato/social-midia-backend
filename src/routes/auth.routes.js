const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();
const upload = multer({ storage });
const multer = require("multer");

router.post("/login", AuthController.login);
router.post("/register", upload.single("picture"), AuthController.register);

module.exports = router;
