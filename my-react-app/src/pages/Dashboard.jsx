import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { fetchDashboardCards, fetchDashboardChart } from "../utils/api";

const Dashboard = () => {
  const { user } = useUser();
  const [cards, setCards] = useState(null);
  const [chart, setChart] = useState(null);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  useEffect(() => {
    setLoadingCards(true);
    fetchDashboardCards().then((data) => {
      setCards(data);
      setLoadingCards(false);
    });
    setLoadingChart(true);
    fetchDashboardChart().then((data) => {
      setChart(data);
      setLoadingChart(false);
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="glass-wrapper max-w-3xl w-full mx-auto px-6 py-10 shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.18)] font-body">
        <h1 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary-600 via-accent-500 to-primary-400 bg-clip-text text-transparent tracking-tight font-display">Dashboard</h1>
        {/* User Info */}
        <div className="mb-10 p-6 bg-glass-gradient rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between border border-primary-100 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg font-display">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <div className="font-semibold text-xl text-blue-900">Welcome, {user?.name || "User"}!</div>
              <div className="text-gray-500">{user?.email || "-"}</div>
              <div className="text-gray-400 text-sm">{user?.company || "-"} 2 {user?.industry || "-"} 2 {user?.size || "-"}</div>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 flex flex-col gap-2 items-end">
            <span className="inline-block px-4 py-1 bg-accent-100 text-accent-700 rounded-full font-semibold shadow font-display">Theme: {user?.theme || "light"}</span>
            <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full font-semibold shadow font-display">Layout: {user?.layout || "default"}</span>
          </div>
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {loadingCards ? (
            <div className="col-span-3 text-center py-8">Loading cards...</div>
          ) : (
            cards.map((card, idx) => (
              <div
                key={card.label}
                className="bg-gradient-to-br from-blue-100 via-white to-purple-100 rounded-2xl shadow-lg p-8 flex flex-col items-center group transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-blue-100"
                style={{ animation: `fadeInUp 0.5s ease ${(idx + 1) * 0.1}s both` }}
              >
                <div className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">{card.value}</div>
                <div className="text-gray-700 font-semibold tracking-wide">{card.label}</div>
              </div>
            ))
          )}
        </div>
        {/* Chart */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 mb-10 border border-purple-100">
          <h2 className="text-xl font-bold mb-4 text-purple-800">Weekly Progress</h2>
          <div style={{ width: "100%", height: 250 }}>
            {loadingChart ? (
              <div className="text-center py-16">Loading chart...</div>
            ) : (
              <ResponsiveContainer>
                <BarChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#a78bfa" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        {/* Recent Activity Widget */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-6 animate-fade-in border border-purple-100">
          <h2 className="text-xl font-bold mb-4 text-purple-800">Recent Activity</h2>
          <ul className="divide-y divide-gray-100">
            {[
              { id: 1, activity: "Invited new team member: Jane Doe", time: "2 hours ago" },
              { id: 2, activity: "Created project: Cascade UI", time: "Yesterday" },
              { id: 3, activity: "Changed theme to Dark mode", time: "2 days ago" },
              { id: 4, activity: "Completed onboarding", time: "3 days ago" },
            ].map((item, idx) => (
              <li key={item.id} className="py-3 flex justify-between items-center opacity-0 animate-fade-in" style={{ animationDelay: `${0.2 + idx * 0.1}s`, animationFillMode: 'forwards' }}>
                <span className="text-gray-700 font-medium">{item.activity}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
