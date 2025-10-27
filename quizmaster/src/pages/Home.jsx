import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Home({ categories = [], loadingCats = false, history = [], onStart }) {
  const { quizConfig, setQuizConfig } = useContext(QuizContext);

  const updateForm = (key, value) => {
    setQuizConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart?.();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* Top hero / alignment card */}
      <section className="grid lg:grid-cols-2 gap-6">
        {/* Left: message card */}
        <div className="rounded-2xl bg-lavender/60 border border-lavender p-6 md:p-8 flex items-center">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-purplePrimary/10 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="size-6 text-purplePrimary"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11 2l-1 6H4l6 4-2 8 7-5 7 5-2-8 6-4h-6l-1-6-4 4z" />
              </svg>
            </div>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-gray-900">
                Ready to test your knowledge?
              </h1>
              <p className="mt-2 text-gray-600 font-body">
                Pick a category, choose your difficulty, and we’ll spin up a fresh quiz from
                Open&nbsp;Trivia&nbsp;DB. Track your progress and try to beat your best score.
              </p>

              {/* Small quick facts row */}
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-white/70 border">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  Live questions
                </span>
                <span className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-white/70 border">
                  <span className="size-1.5 rounded-full bg-blue-500" />
                  Multiple choice
                </span>
                <span className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-white/70 border">
                  <span className="size-1.5 rounded-full bg-purplePrimary" />
                  Instant scoring
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form card */}
        <div className="rounded-2xl bg-white border shadow-sm p-6 md:p-8">
          <h2 className="font-heading text-xl text-gray-900">🎯 Start a New Quiz</h2>

          <form onSubmit={handleSubmit} className="mt-5 grid sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={quizConfig.category}
                onChange={(e) => updateForm("category", e.target.value)}
                className="mt-1 block w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
              >
                <option value="">Select</option>
                {loadingCats ? (
                  <option disabled>Loading...</option>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="9">General Knowledge</option>
                    <option value="17">Science &amp; Nature</option>
                  </>
                )}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty</label>
              <select
                value={quizConfig.difficulty}
                onChange={(e) => updateForm("difficulty", e.target.value)}
                className="mt-1 block w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Questions</label>
              <input
                type="number"
                min={1}
                max={50}
                value={quizConfig.amount}
                onChange={(e) => {
                  const n = Math.min(50, Math.max(1, Number(e.target.value) || 1));
                  updateForm("amount", n);
                }}
                className="mt-1 block w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purplePrimary/40"
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <button
                className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-purplePrimary text-white px-4 py-2.5 hover:opacity-90 transition"
                type="submit"
              >
                Start Quiz
              </button>
            </div>
          </form>

          {/* Tiny helper */}
          <p className="text-xs text-gray-500 mt-3">
            Tip: you can change these settings anytime and start again.
          </p>
        </div>
      </section>

      {/* History list */}
      <section className="mt-8">
        <h3 className="font-heading text-lg text-gray-900">Recent Attempts</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 mt-2">No attempts yet — give it a try!</p>
        ) : (
          <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((h, idx) => (
              <li
                key={idx}
                className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-1"
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
