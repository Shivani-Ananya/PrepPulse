import { useEffect, useState } from "react";

/* ================= CONFIG ================= */

const PLACEMENT_END = new Date("2027-08-31");
const FINAL_YEAR_END = new Date("2028-05-31");

const DAILY_DOMAINS = [
  { key: "DSA", emoji: "🧠", color: "from-pink-400 to-purple-400" },
  { key: "Aptitude", emoji: "📊", color: "from-purple-400 to-indigo-400" },
  { key: "Fitness", emoji: "🧘‍♀️", color: "from-green-400 to-emerald-400" },
  { key: "Music", emoji: "🎵", color: "from-blue-400 to-cyan-400" },
  { key: "Projects", emoji: "💻", color: "from-orange-400 to-pink-400" },
  { key: "Other Works", emoji: "🗂️", color: "from-gray-400 to-slate-500" },
];

const SOFT_QUOTES = [
  "Small steps daily → big placement energy 🌱",
  "Consistency beats intensity.",
  "Calm focus wins long races.",
  "You don’t need pressure. You need direction.",
  "Today counts. Gently.",
];

/* ================= HELPERS ================= */

const daysBetween = (from, to) =>
  Math.max(
    Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)),
    0
  );

const todayKey = () => new Date().toISOString().slice(0, 10);

/* ================= COMPONENT ================= */

export default function HomePage() {
  const today = new Date();
  const dateKey = todayKey();

  const DOMAIN_KEY = `prepulse-domains-${dateKey}`;
  const META_KEY = "prepulse-streak-meta";

  const [checkedDomains, setCheckedDomains] = useState({});
  const [meta, setMeta] = useState({
    currentStreak: 0,
    daysUsed: 0,
    daysWasted: 0,
    lastUpdated: null,
  });

  /* ---------- LOAD DAILY DOMAINS ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(DOMAIN_KEY);
    if (saved) setCheckedDomains(JSON.parse(saved));
  }, [DOMAIN_KEY]);

  /* ---------- LOAD META ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(META_KEY);
    if (saved) setMeta(JSON.parse(saved));
  }, []);

  /* ---------- SAVE DOMAINS ---------- */
  useEffect(() => {
    localStorage.setItem(DOMAIN_KEY, JSON.stringify(checkedDomains));
  }, [checkedDomains, DOMAIN_KEY]);

  /* ---------- DAILY STREAK UPDATE ---------- */
  useEffect(() => {
    if (meta.lastUpdated === dateKey) return;

    const completed = Object.values(checkedDomains).filter(Boolean).length;
    let updated = { ...meta };

    if (completed > 0) {
      updated.currentStreak += 1;
      updated.daysUsed += 1;
    } else {
      updated.currentStreak = 0;
      updated.daysWasted += 1;
    }

    updated.lastUpdated = dateKey;
    setMeta(updated);
    localStorage.setItem(META_KEY, JSON.stringify(updated));
    // eslint-disable-next-line
  }, [dateKey]);

  /* ---------- RESET OLD DAY ---------- */
  useEffect(() => {
    const lastDate = localStorage.getItem("prepulse-last-date");
    if (lastDate !== dateKey) {
      if (lastDate) {
        localStorage.removeItem(`prepulse-domains-${lastDate}`);
      }
      localStorage.setItem("prepulse-last-date", dateKey);
    }
  }, [dateKey]);

  /* ---------- COUNTDOWNS ---------- */
  const placementDays = daysBetween(today, PLACEMENT_END);
  const finalYearDays = daysBetween(today, FINAL_YEAR_END);

  /* ---------- PROGRESS ---------- */
  const completedCount = Object.values(checkedDomains).filter(Boolean).length;
  const progressPercent = Math.round(
    (completedCount / DAILY_DOMAINS.length) * 100
  );

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-6 mt-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold gradient-text">
          Welcome back 👋
        </h1>
        <p className="text-gray-500 mt-2">
          {SOFT_QUOTES[Math.floor(Math.random() * SOFT_QUOTES.length)]}
        </p>
      </div>

      {/* COUNTDOWNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-glass p-6">
          <p className="text-sm text-gray-500">Placement Season</p>
          <p className="text-3xl font-semibold">{placementDays} days</p>
        </div>

        <div className="bg-glass p-6">
          <p className="text-sm text-gray-500">Final Year Remaining</p>
          <p className="text-3xl font-semibold">{finalYearDays} days</p>
        </div>
      </div>

      {/* DAILY DOMAINS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Today’s Focus Areas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DAILY_DOMAINS.map((domain) => {
            const isChecked = checkedDomains[domain.key];

            return (
              <div key={domain.key} className="bg-glass p-5 flex justify-between">
                <div>
                  <p className="text-lg font-medium">
                    {domain.emoji} {domain.key}
                  </p>
                  <p className="text-sm text-gray-500">
                    Daily consistency target
                  </p>
                </div>

                <button
                  onClick={() =>
                    setCheckedDomains((prev) => ({
                      ...prev,
                      [domain.key]: !prev[domain.key],
                    }))
                  }
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    isChecked
                      ? `bg-gradient-to-r ${domain.color} text-white`
                      : "border-gray-300"
                  }`}
                >
                  {isChecked ? "✓" : ""}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-glass p-5">
          <p className="text-sm text-gray-500">Current Streak</p>
          <p className="text-2xl font-semibold">🔥 {meta.currentStreak}</p>
        </div>

        <div className="bg-glass p-5">
          <p className="text-sm text-gray-500">Days Used</p>
          <p className="text-2xl font-semibold">{meta.daysUsed}</p>
        </div>

        <div className="bg-glass p-5">
          <p className="text-sm text-gray-500">Days Wasted</p>
          <p className="text-2xl font-semibold">{meta.daysWasted}</p>
        </div>

        <div className="bg-glass p-5">
          <p className="text-sm text-gray-500">Today’s Progress</p>
          <p className="text-2xl font-semibold">
            {completedCount}/{DAILY_DOMAINS.length} · {progressPercent}%
          </p>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
