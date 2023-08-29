import asyncHandler from "express-async-handler";

// @desc    Get healthcheck
// @route   GET /healthcheck
// @access  Private/Admin
export const getHealthcheck = asyncHandler(async (_, res) => {
    res.status(200).json({ message: "OK" });
});
