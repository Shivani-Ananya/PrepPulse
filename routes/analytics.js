const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Analytics = require("../models/Analytics");
const Task = require("../models/Task");

/**
 * GET /api/analytics/summary
 * Returns user productivity stats
 */
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      completed: true,
    });

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.json({
      totalTasks,
      completedTasks,
      completionRate,
      streak: req.user.streak,
      daysUsed: req.user.daysUsed,
    });
  } catch (err) {
    console.error("Analytics summary error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
