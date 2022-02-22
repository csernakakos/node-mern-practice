const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");


// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    res.json({msg: "Register User"})
});


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    res.json({msg: "Log in User"})
});

// @desc    Get user data
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async(req, res) => {
    res.json({msg: "GET ME"})
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
}