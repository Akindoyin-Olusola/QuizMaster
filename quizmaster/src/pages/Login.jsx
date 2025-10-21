import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-80 text-center"
      >
        <h1 className="text-3xl font-bold mb-4 text-purple-700">QuizMaster</h1>
        <p className="text-gray-600 mb-6">Log in to start your learning adventure ✨</p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button className="w-full mb-3">Login</button>
        <p className="text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-700 font-semibold">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
