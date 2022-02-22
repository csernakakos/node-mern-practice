const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {getMe, loginUser, registerUser} = require("../controllers/userController");


router
    .route("/")
    .post(registerUser)

router
    .route("/login")
    .post(loginUser)

router
    .route("/me")
    .get(protect, getMe)

module.exports = router;