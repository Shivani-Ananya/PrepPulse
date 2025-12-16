import React from 'react';
import {
  Home,
  CheckSquare,
  Timer,
  Calendar,
  User
} from 'lucide-react';

export default function Nav({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'focus', label: 'Focus', icon: Timer },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bottom-nav max-w-5xl mx-auto px-4 py-3 flex justify-between">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setCurrentPage(id)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition ${
              currentPage === id
                ? 'text-purple-600'
                : 'text-gray-400 hover:text-purple-400'
            }`}
          >
            <Icon size={22} />
            <span className="text-[11px] font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
