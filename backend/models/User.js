const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Student",
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  placementDate: {
    type: Date,
  },
  streak: {
    type: Number,
    default: 0,
  },
  daysUsed: {
    type: Number,
    default: 0,
  },
  lastActive: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ---------- STREAK LOGIC ---------- */
userSchema.methods.updateDailyActivity = async function () {
  const today = new Date().toDateString();
  const last = this.lastActive?.toDateString();

  if (last === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  this.streak =
    last === yesterday.toDateString() ? this.streak + 1 : 1;

  this.daysUsed += 1;
  this.lastActive = new Date();

  await this.save();
};

module.exports = mongoose.model("User", userSchema);
