const express = require("express");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// Apply for a job
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.body;

    // Check job ID
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Get logged-in candidate
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check resume
    if (!user.resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume before applying",
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      candidate: req.userId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      candidate: req.userId,
      job: jobId,
      resume: user.resume,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: error.message,
    });
  }

});

  // Get my applications
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.userId,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});

module.exports = router;