import { useState } from "react";
import api from "../services/api";

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
        mode === "login" ? "/auth/login" : "/auth/register";

      const payload =
        mode === "login"
          ? { email, password }
          : {
              email,
              password,
              name: email.split("@")[0],
            };

      const res = await api.post(endpoint, payload);

      const { user, token } = res.data;

      // ✅ Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Notify App.jsx
      onLogin(user, token);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to connect. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="bg-glass p-8 w-full max-w-sm space-y-6">

        {/* BRAND */}
        <h2 className="text-3xl font-bold text-center gradient-text">
          PrepPulse ✨
        </h2>

        {/* MODE TOGGLE */}
        <div className="flex rounded-xl bg-white/50 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${
              mode === "login"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                : "text-gray-600"
            }`}
          >
            Existing User
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${
              mode === "signup"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                : "text-gray-600"
            }`}
          >
            New User
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
            required
          />

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-500">
          {mode === "login"
            ? "Welcome back. Let’s continue your streak 🌱"
            : "Your placement journey starts today 🌸"}
        </p>
      </div>
    </div>
  );
}
