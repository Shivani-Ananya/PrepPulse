import React from 'react';

export default function Dashboard({
  placementDaysLeft = 625,
  collegeDaysLeft = 747,
  streak = 5,
}) {
  const focusAreas = ['DSA', 'Aptitude', 'Yoga', 'Music', 'Coding'];

  return (
    <div className="space-y-8 fade-in">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text">
          PrepPulse 🌸
        </h1>
        <p className="subtle-text mt-2">
          Your quiet discipline era till Aug 2027
        </p>
      </div>

      {/* Countdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 text-center">
          <p className="subtle-text">Placement Countdown</p>
          <p className="text-5xl font-bold text-purple-600 mt-2">
            {placementDaysLeft}
          </p>
          <p className="subtle-text mt-1">days left</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="subtle-text">4th Year Remaining 🎓</p>
          <p className="text-5xl font-bold text-pink-500 mt-2">
            {collegeDaysLeft}
          </p>
          <p className="subtle-text mt-1">days to graduation</p>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Today’s Focus Areas
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {focusAreas.map(area => (
            <div
              key={area}
              className="bg-white/60 rounded-2xl py-4 text-center hover:scale-105 transition"
            >
              <p className="font-medium text-gray-700">{area}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Card */}
      <div className="glass-card p-6 text-center">
        <p className="subtle-text">Current Streak 🔥</p>
        <p className="text-4xl font-bold text-orange-400 mt-2">
          {streak} days
        </p>
        <p className="subtle-text mt-1">
          Consistency over intensity
        </p>
      </div>

      {/* Motivation */}
      <div className="glass-card p-6">
        <p className="italic text-center text-gray-600">
          “Small disciplined days create unreal futures.”
        </p>
      </div>

    </div>
  );
}
