import { useState } from "react";

/* ---------------- CONFIG ---------------- */

const COLLEGE_TEMPLATE = [
  { time: "6:00 – 7:00 AM", task: "Wake up + Light stretch" },
  { time: "7:00 – 8:00 AM", task: "Breakfast + Travel" },
  { time: "9:00 AM – 4:00 PM", task: "College Hours" },
  { time: "4:30 – 5:30 PM", task: "Rest / Power nap" },
  { time: "6:00 – 7:00 PM", task: "DSA / Core Study" },
  { time: "7:00 – 7:20 PM", task: "Break" },
  { time: "7:20 – 8:20 PM", task: "Project / Coding" },
  { time: "8:30 – 9:00 PM", task: "Dinner + Relax" },
  { time: "9:00 – 9:30 PM", task: "Revision / Planning" },
];

const HOLIDAY_TEMPLATE = [
  { time: "6:30 – 7:00 AM", task: "Wake up + Calm start" },
  { time: "7:00 – 8:30 AM", task: "Deep DSA Session" },
  { time: "8:30 – 9:00 AM", task: "Break" },
  { time: "9:00 – 11:00 AM", task: "Project / Skill Building" },
  { time: "11:00 – 11:30 AM", task: "Break" },
  { time: "11:30 AM – 1:00 PM", task: "Aptitude / Core Subjects" },
  { time: "2:00 – 3:00 PM", task: "Fitness / Yoga" },
  { time: "4:00 – 5:30 PM", task: "Revision / Practice" },
  { time: "8:30 – 9:00 PM", task: "Wind down + Reflection" },
];

const MOTIVATION_LINES = [
  "Show up calmly. Results will follow 🌱",
  "You don’t need perfect days — just honest ones.",
  "Consistency quietly builds confidence.",
  "A balanced day beats an intense one.",
  "Progress loves patience.",
];

/* ---------------- COMPONENT ---------------- */

export default function SchedulePage() {
  const today = new Date();
  const dayLabel = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const [dayType, setDayType] = useState("");
  const [customPlan, setCustomPlan] = useState("");
  const [schedule, setSchedule] = useState([]);

  /* -------- GENERATE SCHEDULE -------- */

  const generateSchedule = () => {
    // Case 1: user gave custom plan
    if (customPlan.trim()) {
      const blocks = customPlan
        .split(",")
        .map((item, i) => ({
          time: `Block ${i + 1}`,
          task: item.trim(),
        }));

      setSchedule(blocks);
      return;
    }

    // Case 2: auto generate
    if (dayType === "college") {
      setSchedule(COLLEGE_TEMPLATE);
    } else if (dayType === "holiday") {
      setSchedule(HOLIDAY_TEMPLATE);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-5xl mx-auto px-6 mt-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">
          Schedule 🗓️
        </h1>
        <p className="text-gray-500 mt-1">
          {dayLabel}
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="bg-glass p-6 space-y-4">

        {/* DAY TYPE */}
        <div>
          <p className="text-sm text-gray-600 mb-2">
            What kind of day is today?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setDayType("college")}
              className={`px-4 py-2 rounded-xl border ${
                dayType === "college"
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                  : ""
              }`}
            >
              College Day 🎓
            </button>

            <button
              onClick={() => setDayType("holiday")}
              className={`px-4 py-2 rounded-xl border ${
                dayType === "holiday"
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                  : ""
              }`}
            >
              Holiday 🌸
            </button>
          </div>
        </div>

        {/* CUSTOM PLAN */}
        <div>
          <p className="text-sm text-gray-600 mb-1">
            Any specific plan? (optional)
          </p>
          <input
            value={customPlan}
            onChange={(e) => setCustomPlan(e.target.value)}
            placeholder="DSA, Project, Yoga, Revision..."
            className="w-full px-4 py-3 rounded-xl border"
          />
        </div>

        {/* GENERATE BUTTON */}
        <button
          onClick={generateSchedule}
          disabled={!dayType && !customPlan}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium disabled:opacity-50"
        >
          Generate My Day ✨
        </button>
      </div>

      {/* SCHEDULE OUTPUT */}
      {schedule.length > 0 && (
        <div className="space-y-4">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="bg-glass p-4 flex items-center gap-4"
            >
              <div className="text-sm text-gray-400 min-w-[110px]">
                {item.time}
              </div>
              <p className="font-medium text-gray-700">
                {item.task}
              </p>
            </div>
          ))}

          {/* MOTIVATION */}
          <div className="bg-glass p-5 mt-4">
            <p className="italic text-center text-gray-600">
              {
                MOTIVATION_LINES[
                  Math.floor(Math.random() * MOTIVATION_LINES.length)
                ]
              }
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
