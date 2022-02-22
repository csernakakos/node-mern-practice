const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    console.log(req.user);
    const goals = await Goal.find({user: req.user._id });
    res.status(200).json({status: "success", goals});
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field.")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id
    });

    res.status(200).json({status: "success", goal});
});

// @desc    Update goal
// @route   PUT /api/goals/:ID
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.ID);

    if (!goal) {
        res.status(400)
        throw new Error("No such goal exists.")
    }

    const user = await User.findById(req.user._id);

    if(!user) {
        res.status(400)
        throw new Error("User not found.")
    }

    if(goal.user.toString() !== user._id) {
        res.status(403)
        throw new Error("Not Authorized.")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.ID, req.body, {new: true});

    res.status(200).json({status: "success", updatedGoal})
});

// @desc    Delete goal
// @route   DELETE /api/goals/:ID
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.ID);

    if (!goal) {
        res.status(400)
        throw new Error("No such goal exists.");
    }

    if (!user) {
        res.status(401)
        throw new Error("User not found.")
    }

    if (goal.user.toString() !== user._id) {
        res.status(403)
        throw new Error("Not Authorized.")
    }

    // SOLUTION 1:
    // await Goal.findByIdAndDelete(req.params.ID);

    // SOLUTION 2:
    await goal.remove();

    res.status(200).json({status: "success", id: req.params.ID});
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}