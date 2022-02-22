const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields!");
    };

    // Does the user exist?
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400)
        throw new Error("This email is already registered.")
    };

    // Generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (newUser)  {
        res.status(201).json({
            status: "success",
            newUser: {
                _id: newUser._id,
                email: newUser.email,
            }
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all fields!");
    };

    const existingUser = await User.findOne({email});

    if (!existingUser) {
        res.status(400)
        throw new Error("hey sis, you don't yet exist")
    };

    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
        res.status(200).json({status: "success"});
    } else {
        res.status(400)
        throw new Error("Wrong user credentials.")
    }
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