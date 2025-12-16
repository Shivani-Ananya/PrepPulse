/**
 * Smart Schedule Generator
 * User-time customizable
 * --------------------------------
 * Inputs:
 *  - tasks: array of user tasks
 *  - preferences: {
 *      startTime: "07:00",
 *      endTime: "22:00",
 *      sessionDuration: 60 // minutes
 *    }
 */

const generateSchedule = (
  tasks = [],
  preferences = {
    startTime: "09:00",
    endTime: "21:00",
    sessionDuration: 90,
  }
) => {
  const { startTime, endTime, sessionDuration } = preferences;

  /* ================= HELPERS ================= */
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const toTimeString = (mins) => {
    const h = Math.floor(mins / 60)
      .toString()
      .padStart(2, "0");
    const m = (mins % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  /* ================= TIME SLOTS ================= */
  const slots = [];
  let current = toMinutes(startTime);
  const end = toMinutes(endTime);

  while (current + sessionDuration <= end) {
    const slotStart = current;
    const slotEnd = current + sessionDuration;

    slots.push({
      start: toTimeString(slotStart),
      end: toTimeString(slotEnd),
    });

    current = slotEnd;
  }

  /* ================= CATEGORY PRIORITY ================= */
  const categoryMap = {};

  tasks.forEach((task) => {
    if (task.completed) return;
    if (!categoryMap[task.category]) {
      categoryMap[task.category] = [];
    }
    categoryMap[task.category].push(task);
  });

  const sortedCategories = Object.keys(categoryMap).sort(
    (a, b) => categoryMap[b].length - categoryMap[a].length
  );

  /* ================= BUILD SCHEDULE ================= */
  const schedule = [];

  slots.forEach((slot, index) => {
    const category = sortedCategories[index % sortedCategories.length];

    if (!category) return;

    const relatedTasks = categoryMap[category].slice(0, 3);

    schedule.push({
      id: index + 1,
      title: category,
      time: `${slot.start} - ${slot.end}`,
      duration: `${sessionDuration} mins`,
      priority:
        index === 0
          ? "high"
          : index < Math.ceil(slots.length / 2)
          ? "medium"
          : "low",
      tasks: relatedTasks.map((t) => ({
        id: t._id,
        text: t.text,
      })),
    });
  });

  return schedule;
};

module.exports = { generateSchedule };
