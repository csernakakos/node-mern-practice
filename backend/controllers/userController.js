const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // to hash & salt passwords

// JWT function
// The payload is the user data. We pass it into jwt.sign
const signToken = (id) => {
    return jwt.sign(
        {id}, // <- payload. We set the payload to be the user's ID. Next, when we use jwt.verify, we'll get that ID back in "decoded". See authMiddleware.js
        process.env.JWT_SECRET, // <- secret
        {expiresIn: "2d"}, // <- when the JWT expires
    );
}
// JWT function

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
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user)  {
        res.status(201).json({
            status: "success",
            newUser: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: signToken(user._id) // <- JWT
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

    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
        res.status(200).json({
            status: "success",
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                token: signToken(existingUser._id) // <- JWT
            }
        });
    } else {
        res.status(400)
        throw new Error("Missing or wrong user credentials.")
    }
});

// @desc    Get user data
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);
    res.json({
        status: "success",
        user: {
            _id,
            name,
            email,
        }
    })
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
}