import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Router>
      <div className={theme === "dark" ? "min-h-screen bg-gray-900 text-white relative" : "min-h-screen bg-gray-50 text-blue-900 relative"}>
        {/* Animated background gradient */}
        <div
          className={
            theme === "dark"
              ? "fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-blue-900/60 to-purple-900 animate-gradient-move"
              : "fixed inset-0 -z-10 bg-gradient-to-br from-blue-100 via-white to-purple-100 animate-gradient-move"
          }
          aria-hidden="true"
        />
        <nav
          className={
            `fixed top-0 left-0 w-full z-30 px-0 py-0 transition-all duration-300 ` +
            (theme === "dark"
              ? "bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 text-white shadow-lg"
              : "bg-gradient-to-br from-blue-400/80 via-white/80 to-purple-300/70 text-blue-900 shadow-lg backdrop-blur-md")
          }
        >
          <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
            <div className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400 bg-clip-text text-transparent">My App</div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/onboarding"
                className="px-3 py-1 rounded-lg font-medium transition-all duration-200 hover:bg-blue-100/70 hover:text-blue-700 focus:ring-2 focus:ring-blue-300"
              >
                Onboarding
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-1 rounded-lg font-medium transition-all duration-200 hover:bg-purple-100/70 hover:text-purple-700 focus:ring-2 focus:ring-purple-300"
              >
                Dashboard
              </Link>
              <button
                onClick={toggleTheme}
                className={
                  theme === "dark"
                    ? "ml-2 px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow"
                    : "ml-2 px-3 py-1 rounded-lg bg-white/90 text-blue-600 hover:bg-blue-100 transition-all duration-200 shadow"
                }
                aria-label="Toggle theme"
              >
                <span className="inline-block align-middle text-lg">
                  {theme === "dark" ? "🌙" : "☀️"}
                </span>
                <span className="ml-1 font-semibold hidden sm:inline">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </button>
            </div>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/onboarding" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
