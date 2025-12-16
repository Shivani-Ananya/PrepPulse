import { useEffect, useState, useMemo } from "react";
import api from "../services/api";

/* ---------------- CONFIG ---------------- */

const DOMAINS = [
  "DSA",
  "Aptitude",
  "Fitness",
  "Music",
  "Projects",
  "Other Works",
];

/* ---------------- COMPONENT ---------------- */

export default function ProfilePage({ user }) {
  const [weeklyData, setWeeklyData] = useState({});
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD WEEKLY DATA ---------- */
  useEffect(() => {
    const data = {};
    DOMAINS.forEach((d) => (data[d] = 0));

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = `prepulse-domains-${date.toISOString().slice(0, 10)}`;
      const day = JSON.parse(localStorage.getItem(key) || "{}");

      Object.entries(day).forEach(([domain, done]) => {
        if (done && data[domain] !== undefined) {
          data[domain] += 1;
        }
      });
    }

    setWeeklyData(data);
    setLoading(false);
  }, []);

  /* ---------- ANALYSIS ---------- */
  const analysis = useMemo(() => {
    const entries = Object.entries(weeklyData);
    if (!entries.length) return null;

    const total = entries.reduce((a, [, v]) => a + v, 0);
    const weakest = entries.reduce((a, b) => (a[1] < b[1] ? a : b));
    const strongest = entries.reduce((a, b) => (a[1] > b[1] ? a : b));

    return { total, weakest, strongest };
  }, [weeklyData]);

  if (loading) {
    return <p className="text-center mt-10">Loading profile…</p>;
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl mx-auto px-6 mt-10 space-y-8">

      <h1 className="text-3xl font-bold gradient-text">
        Profile & Insights 🧠
      </h1>

      {/* USER INFO */}
      <div className="bg-glass p-6">
        <p className="text-gray-700">
          Email: <b>{user?.email}</b>
        </p>
      </div>

      {/* STATS */}
      {analysis && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-glass p-5">
              <p className="text-sm text-gray-500">Total Active Days</p>
              <p className="text-2xl font-semibold">{analysis.total}</p>
            </div>

            <div className="bg-glass p-5">
              <p className="text-sm text-gray-500">Strongest Area</p>
              <p className="text-xl font-semibold">
                {analysis.strongest[0]}
              </p>
            </div>

            <div className="bg-glass p-5">
              <p className="text-sm text-gray-500">Needs Attention</p>
              <p className="text-xl font-semibold">
                {analysis.weakest[0]}
              </p>
            </div>
          </div>

          {/* DOMAIN BARS */}
          <div className="bg-glass p-6 space-y-4">
            <h3 className="font-semibold text-lg">
              Weekly Domain Breakdown
            </h3>

            {Object.entries(weeklyData).map(([domain, count]) => (
              <div key={domain}>
                <div className="flex justify-between text-sm">
                  <span>{domain}</span>
                  <span>{count}/7</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                    style={{ width: `${(count / 7) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
