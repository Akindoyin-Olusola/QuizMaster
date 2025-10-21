import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "Student", avatar: "" });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("quizUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-700">Welcome, {user.name} 👋</h1>
          <p className="text-gray-600">Your learning progress at a glance</p>
        </div>
        <img
          src={user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-purple-400"
        />
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
        <h2 className="font-semibold text-purple-700 mb-2">Daily Streak 🔥</h2>
        <p className="text-gray-500 mb-4">You’ve practiced for 3 days in a row!</p>
        <ProgressBar progress={65} />
      </div>

      {/* Quiz Subjects */}
      <div>
        <h2 className="font-semibold text-purple-700 mb-3">Choose a Subject</h2>
        <div className="grid grid-cols-2 gap-4">
          {["General Knowledge", "Science & Nature", "Computers", "Mathematics"].map((subject) => (
            <Link
              to="/quiz"
              key={subject}
              className="bg-purple-600 text-white p-4 rounded-2xl text-center hover:bg-purple-700 transition"
            >
              {subject}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
