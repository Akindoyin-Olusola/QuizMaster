import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user info to localStorage temporarily (for demo)
    localStorage.setItem("quizUser", JSON.stringify(form));
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center"
      >
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Create Account</h1>
        <p className="text-gray-600 mb-6">Join QuizMaster and start learning smarter 💡</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mb-3 px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mb-3 px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full mb-5 px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />

          <button type="submit" className="w-full">Register</button>
        </form>

        <p className="text-sm text-gray-500 mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-purple-700 font-semibold">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
