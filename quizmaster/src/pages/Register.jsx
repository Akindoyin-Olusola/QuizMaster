import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: true,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function update(key, value) {
    setErr("");
    setForm((p) => ({ ...p, [key]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.password.length < 6) return "Password should be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.agree) return "Please accept the Terms to continue.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const msg = validate();
    if (msg) return setErr(msg);

    setLoading(true);
    try {
      // TODO: replace with real API call
      const user = { name: form.name, email: form.email, avatar: "" };
      localStorage.setItem("quizUser", JSON.stringify(user));
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
        <div className="rounded-2xl bg-white border shadow-sm p-6 md:p-8">
          {/* Brand lockup */}
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

          <h1 className="font-heading text-xl text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-600 mt-1">Join and start learning smarter 💡</p>

          {/* Error */}
          {err && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
              {err}
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
                placeholder="Ada Lovelace"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Use 6+ characters for a strong password.</p>
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                value={form.confirm}
                onChange={(e) => update("confirm", e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => update("agree", e.target.checked)}
                  className="rounded border-gray-300 text-purplePrimary focus:ring-purplePrimary/40"
                />
                I agree to the <a className="text-purplePrimary hover:underline" href="#">Terms</a>
              </label>
              <Link to="/" className="text-sm text-purplePrimary hover:underline">Back to login</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-purplePrimary text-white px-4 py-2.5 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-purplePrimary font-medium hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
