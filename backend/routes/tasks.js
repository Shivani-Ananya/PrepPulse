const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    text: req.body.text,
    category: req.body.category,
    priority: req.body.priority,
    user: req.user._id,
  });

  res.json(task);
});

module.exports = router;
