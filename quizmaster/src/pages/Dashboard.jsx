import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "Student", avatar: "" });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("quizUser") || "null");
    if (savedUser) setUser(savedUser);
  }, []);

  const avatarUrl = useMemo(() => {
    const seed = encodeURIComponent(user?.name || "Student");
    return user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
  }, [user]);

  // Example quick stats (you can replace with real values later)
  const stats = [
    { label: "Quizzes Taken", value: 12 },
    { label: "Best Score", value: "9 / 10" },
    { label: "Avg. Accuracy", value: "78%" },
    { label: "Streak", value: "3 days 🔥" },
  ];

  const subjects = [
    { name: "General Knowledge", to: "/quiz", color: "bg-purplePrimary" },
    { name: "Science & Nature", to: "/quiz", color: "bg-blue-600" },
    { name: "Computers", to: "/quiz", color: "bg-emerald-600" },
    { name: "Mathematics", to: "/quiz", color: "bg-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lavender/60">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl text-gray-900">
              Welcome, {user.name} 👋
            </h1>
            <p className="text-gray-600 font-body">
              Your learning progress at a glance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-12 h-12 rounded-full border-2 border-purplePrimary/50 bg-white object-cover"
            />
            <Link
              to="/home"
              className="hidden sm:inline-flex px-3 py-2 text-sm rounded-lg bg-purplePrimary text-white hover:opacity-90"
            >
              Start New Quiz
            </Link>
          </div>
        </div>

        {/* Streak / Progress */}
        <section className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* Streak Card */}
          <div className="lg:col-span-2 rounded-2xl bg-white border shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-lg text-gray-900">Daily Streak</h2>
                <p className="text-gray-600 text-sm mt-1">
                  You’ve practiced for <span className="font-medium">3 days</span> in a row!
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full text-sm">
                🔥 Keep it up
              </div>
            </div>

            <div className="mt-4">
              {/* Pass whatever real progress you track */}
              <ProgressBar progress={65} />
              <div className="mt-2 text-xs text-gray-500">65% of today’s goal</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl bg-white border shadow-sm p-6">
            <h3 className="font-heading text-lg text-gray-900">Quick Stats</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <li key={s.label} className="rounded-xl border bg-gray-50 p-3">
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">{s.value}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Subjects */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg text-gray-900">Choose a Subject</h2>
            <Link
              to="/home"
              className="text-sm text-purplePrimary hover:underline"
            >
              or customize quiz →
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((s) => (
              <Link
                to={s.to}
                key={s.name}
                className={`group rounded-2xl p-4 text-white ${s.color} hover:opacity-95 transition shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{s.name}</div>
                  <div className="opacity-80 group-hover:opacity-100 transition">
                    {/* Arrow icon */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-white/80">
                  Jump right into a quick quiz
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent History */}
        <section className="mt-8">
          <h2 className="font-heading text-lg text-gray-900">Recent Attempts</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(JSON.parse(localStorage.getItem("quiz_history") || "[]")).slice(0, 6).map((h, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border p-4 shadow-sm flex flex-col gap-2"
              >
                <div className="text-sm text-gray-600">
                  {new Date(h.date).toLocaleString()}
                </div>
                <div className="text-sm">
                  <span className="font-medium">{h.score}</span> / {h.total}
                </div>
                <div className="text-sm text-gray-600">
                  {h.category} • {h.difficulty}
                </div>
              </div>
            ))}
            {/* Empty state */}
            {(!localStorage.getItem("quiz_history") ||
              JSON.parse(localStorage.getItem("quiz_history") || "[]").length === 0) && (
              <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border bg-white p-6 text-center text-gray-500">
                No attempts yet — start your first quiz from <Link to="/home" className="text-purplePrimary hover:underline">Home</Link>.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
