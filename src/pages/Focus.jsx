import { useEffect, useState } from "react";

/* ---------------- CONFIG ---------------- */

const SUBJECTS = [
  "DSA",
  "Aptitude",
  "Projects",
  "Fitness",
  "Music",
  "Other Works",
];

const MOTIVATION = [
  "Deep focus beats long hours.",
  "One clean session is enough.",
  "Start small. Stay steady.",
  "Discipline looks quiet from outside.",
];

/* ---------------- HELPERS ---------------- */

const todayKey = () => new Date().toISOString().slice(0, 10);
const pad = (n) => String(n).padStart(2, "0");

/* ---------------- COMPONENT ---------------- */

export default function FocusPage() {
  const [subject, setSubject] = useState("DSA");
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [rounds, setRounds] = useState(1);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [roundLeft, setRoundLeft] = useState(0);

  /* ---------- TIMER EFFECT ---------- */
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          handlePhaseEnd();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [isRunning]);

  /* ---------- PHASE SWITCH ---------- */
  const handlePhaseEnd = () => {
    if (!isBreak) {
      logFocus();
      if (breakMin > 0) {
        setIsBreak(true);
        setSecondsLeft(breakMin * 60);
        return;
      }
    }

    if (roundLeft > 1) {
      setRoundLeft((r) => r - 1);
      setIsBreak(false);
      setSecondsLeft(focusMin * 60);
    } else {
      stopSession();
      alert("Session completed 🌱");
    }
  };

  /* ---------- START / STOP ---------- */
  const startSession = () => {
    setRoundLeft(rounds);
    setIsBreak(false);
    setSecondsLeft(focusMin * 60);
    setIsRunning(true);
  };

  const stopSession = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(0);
    setRoundLeft(0);
  };

  /* ---------- LOG DATA ---------- */
  const logFocus = () => {
    const key = `prepulse-focus-${todayKey()}`;
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    saved[subject] = (saved[subject] || 0) + focusMin;
    localStorage.setItem(key, JSON.stringify(saved));
  };

  /* ---------- DISPLAY ---------- */
  const mm = pad(Math.floor(secondsLeft / 60));
  const ss = pad(secondsLeft % 60);

  /* ================= UI ================= */

  return (
    <div className="max-w-xl mx-auto px-6 mt-16 space-y-8">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text">
          Focus Mode 🍅
        </h1>
        <p className="text-gray-500 mt-1">
          {MOTIVATION[Math.floor(Math.random() * MOTIVATION.length)]}
        </p>
      </div>

      {/* CONFIG */}
      {!isRunning && (
        <div className="bg-glass p-6 space-y-4">

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          >
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                min={10}
                value={focusMin}
                onChange={(e) => setFocusMin(Number(e.target.value))}
                className="px-3 py-2 rounded-xl border"
                placeholder="Focus"
              />

              <input
                type="number"
                min={0}
                value={breakMin}
                onChange={(e) => setBreakMin(Number(e.target.value))}
                className="px-3 py-2 rounded-xl border"
                placeholder="Break"
              />

              <input
                type="number"
                min={1}
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                className="px-3 py-2 rounded-xl border"
                placeholder="Cycles"
              />
            </div>

            <p className="text-xs text-gray-500 text-center mt-2 leading-snug">
              Focus time (minutes) · Break time (minutes) · Cycles (repeat count)
            </p>


          <button
            onClick={startSession}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium"
          >
            Start Focus
          </button>
        </div>
      )}

      {/* TIMER */}
      {isRunning && (
        <div className="bg-glass p-8 text-center space-y-4">
          <p className="text-sm text-gray-500">
            {isBreak ? "Break 🌿" : `${subject} Focus`}
          </p>

          <p className="text-6xl font-bold">
            {mm}:{ss}
          </p>

          <p className="text-sm text-gray-500">
            Rounds left: {roundLeft}
          </p>

          <button
            onClick={stopSession}
            className="mt-4 px-6 py-2 rounded-xl border text-gray-600"
          >
            Stop
          </button>
        </div>
      )}

    </div>
  );
}
