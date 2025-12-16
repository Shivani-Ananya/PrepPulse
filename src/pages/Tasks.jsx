import { useEffect, useState } from "react";
import { CheckCircle, Circle, Trash2, Plus } from "lucide-react";

/* ---------- DOMAIN OPTIONS ---------- */
const DOMAIN_OPTIONS = [
  "DSA",
  "Aptitude",
  "Fitness",
  "Music",
  "Projects",
  "Other Works",
];

const STORAGE_KEY = "prepulse_tasks";

export default function TasksPage() {
  /* ---------- STATE ---------- */
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("DSA");
  const [priority, setPriority] = useState("medium");

  /* ---------- LOAD TASKS ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  /* ---------- SYNC TASKS ---------- */
  const syncTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  /* ---------- ADD TASK ---------- */
  const handleAddTask = () => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),            // ✅ frontend-safe ID
      text,
      category,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    syncTasks([newTask, ...tasks]);

    setText("");
    setCategory("DSA");
    setPriority("medium");
  };

  /* ---------- TOGGLE ---------- */
  const toggleTask = (id) => {
    syncTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  /* ---------- DELETE ---------- */
  const deleteTask = (id) => {
    syncTasks(tasks.filter((t) => t.id !== id));
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto px-6 mt-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">
          Tasks 🎯
        </h1>
        <p className="text-gray-500 mt-1">
          Small actions, done consistently.
        </p>
      </div>

      {/* ADD TASK */}
      <div className="bg-glass p-6 space-y-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to work on?"
          className="w-full px-4 py-3 rounded-xl border focus:outline-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          >
            {DOMAIN_OPTIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={handleAddTask}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium hover:scale-[1.02] transition"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {tasks.length === 0 && (
          <div className="bg-glass p-8 text-center">
            <p className="text-gray-500">
              No tasks yet. Start small 🌱
            </p>
          </div>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-glass p-4 flex items-center justify-between ${
              task.completed ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className="text-purple-500"
              >
                {task.completed ? (
                  <CheckCircle size={22} />
                ) : (
                  <Circle size={22} />
                )}
              </button>

              <div>
                <p
                  className={`font-medium ${
                    task.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {task.text}
                </p>
                <p className="text-xs text-gray-500">
                  {task.category} • {task.priority}
                </p>
              </div>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
