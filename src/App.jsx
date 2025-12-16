import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TasksPage from "./pages/Tasks";
import SchedulePage from "./pages/Schedule";
import FocusPage from "./pages/Focus";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  /* ---------- AUTH ---------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const handleLogin = (userData, jwt) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  /* ---------- ROUTE GUARD ---------- */
  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Navbar onLogout={handleLogout} />

        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/focus" element={<FocusPage />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
