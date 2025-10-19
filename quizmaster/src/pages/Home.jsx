import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Home({ categories = [], loadingCats = false, history = [], onStart }) {
  const { quizConfig, setQuizConfig } = useContext(QuizContext);

  const updateForm = (key, value) => {
    setQuizConfig({ ...quizConfig, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onStart) onStart();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">🎯 Start a New Quiz</h1>

      {/* Quiz Setup Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={quizConfig.category}
            onChange={(e) => updateForm("category", e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2"
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
                <option value="17">Science & Nature</option>
              </>
            )}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium">Difficulty</label>
          <select
            value={quizConfig.difficulty}
            onChange={(e) => updateForm("difficulty", e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-medium">Questions</label>
          <input
            type="number"
            min={1}
            max={50}
            value={quizConfig.amount}
            onChange={(e) =>
              updateForm("amount", Math.min(50, Math.max(1, Number(e.target.value) || 1)))
            }
            className="mt-1 block w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            type="submit"
          >
            Start Quiz
          </button>
        </div>
      </form>

      {/* Quiz History */}
      <div className="mt-6">
        <h3 className="font-medium">Recent Attempts</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 mt-2">
            No attempts yet — your history will show up here.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {history.map((h, index) => (
              <li key={index} className="text-sm border rounded p-2 bg-gray-50">
                <div className="flex justify-between">
                  <div>{new Date(h.date).toLocaleString()}</div>
                  <div>
                    {h.score}/{h.total} • {h.category} • {h.difficulty}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
