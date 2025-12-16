require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ENV ---------- */
const PORT = process.env.PORT || 8765;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/PrepPulse";

/*---------- Analytics Logger ----------*/
const analyticsLogger = require("./middleware/analytics-logger");
app.use("/api", analyticsLogger);

/* ---------- ROUTES ---------- */
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const scheduleRoutes = require("./routes/schedule");
const analyticsRoutes = require("./routes/analytics");
const userRoutes = require("./routes/users");

/* ---------- DB ---------- */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

/* ---------- API ---------- */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);

/* ---------- FALLBACK ---------- */
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* ---------- START ---------- */
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("👋 Shutting down gracefully...");
  server.close(() => {
    process.exit(0);
  });
});

