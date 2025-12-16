import { NavLink } from "react-router-dom";

export default function Navbar({ onLogout }) {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full transition ${
      isActive
        ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-white/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold gradient-text">
          PrepPulse ✨
        </h1>

        <div className="flex gap-3 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/tasks" className={linkClass}>Tasks</NavLink>
          <NavLink to="/schedule" className={linkClass}>Schedule</NavLink>
          <NavLink to="/focus" className={linkClass}>Focus</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>

          <button
            onClick={onLogout}
            className="ml-2 px-4 py-2 rounded-full bg-red-400 text-white hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
