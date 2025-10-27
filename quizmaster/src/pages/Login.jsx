import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [loading, setLoading] = useState(false);

  function update(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: replace with real API call
      const fakeUser = { name: form.email?.split("@")[0] || "Student", avatar: "" };
      localStorage.setItem("quizUser", JSON.stringify(fakeUser));
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-lavender/60 flex items-center justify-center px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Brand Card */}
        <div className="rounded-2xl bg-white border shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-12 rounded-xl bg-purplePrimary/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="size-6 text-purplePrimary" fill="currentColor" aria-hidden="true">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-heading text-2xl text-gray-900">QuizMaster</div>
              <div className="text-xs text-gray-500">Fun • Learn • Repeat</div>
            </div>
          </div>

          <h1 className="font-heading text-xl text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-600 mt-1">Log in to continue your learning adventure ✨</p>

          {/* Form */}
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {/* Row: remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => update("remember", e.target.checked)}
                  className="rounded border-gray-300 text-purplePrimary focus:ring-purplePrimary/40"
                />
                Remember me
              </label>
              <Link to="#" className="text-sm text-purplePrimary hover:underline">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-purplePrimary text-white px-4 py-2.5 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Secondary action */}
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purplePrimary font-medium hover:underline">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
