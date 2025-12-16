const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const Task = require("../models/Task");
const { generateSchedule } = require("../utils/scheduleGenerator");

/**
 * POST /api/schedule
 * Body:
 * {
 *   startTime: "07:00",
 *   endTime: "22:00",
 *   sessionDuration: 60
 * }
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { startTime, endTime, sessionDuration } = req.body;

    const tasks = await Task.find({
      user: req.user._id,
      completed: false,
    });

    const schedule = generateSchedule(tasks, {
      startTime,
      endTime,
      sessionDuration,
    });

    res.json({
      date: new Date().toDateString(),
      generatedFor: req.user.email,
      schedule,
    });
  } catch (err) {
    console.error("Schedule error:", err);
    res.status(500).json({ error: "Schedule generation failed" });
  }
});

module.exports = router;
