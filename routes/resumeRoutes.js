const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Resume file is required",
        });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.resume = req.file.filename;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Resume uploaded successfully",
        resume: user.resume,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Resume upload failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;