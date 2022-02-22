const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async(req, res, next) => {
    let token;

    // If the header has Authorization Bearer:
    // Authorization Bearer <token>
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.ID).select("-password");

            next();
        } catch(err) {
            res.status(401)
            throw new Error("Not authorized.");
        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Not authorized. No token.")
    }
});

module.exports = {protect};