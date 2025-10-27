import { Link } from "react-router-dom";

export default function Result({ record, onRetake, questions = [] }) {
  const total = record?.total ?? questions.length ?? 0;
  const score = record?.score ?? 0;
  const percent = total ? Math.round((score / total) * 100) : 0;

  const tier =
    percent >= 90 ? "Excellent 🎉" :
    percent >= 75 ? "Great job 🙌" :
    percent >= 50 ? "Nice try 👍" :
    "Keep practicing 💪";

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* Summary card */}
      <section className="rounded-2xl bg-white border shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl text-gray-900">Results</h2>
            <p className="text-gray-600 mt-1">{tier}</p>
          </div>

          {/* Score pill */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-2xl font-heading text-gray-900">
                {score} <span className="text-gray-500">/ {total}</span>
              </div>
              <div className="text-sm text-gray-600">{percent}% correct</div>
            </div>
            <div className="size-16 rounded-full bg-purplePrimary/10 border border-purplePrimary/20 flex items-center justify-center">
              <span className="font-heading text-lg text-purplePrimary">{percent}%</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onRetake}
            className="inline-flex items-center justify-center rounded-xl bg-purplePrimary text-white px-4 py-2.5 hover:opacity-90 transition"
          >
            Back to Home
          </button>
          <Link
            to="/home"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 border text-gray-700 hover:bg-gray-50 transition"
          >
            Start a New Quiz
          </Link>
        </div>
      </section>

      {/* Review list */}
      <section className="mt-8">
        <h3 className="font-heading text-lg text-gray-900">Review</h3>

        {questions.length === 0 ? (
          <div className="mt-4 rounded-xl border bg-white p-6 text-gray-600">
            No question details available.
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {questions.map((q, i) => {
              const user = q.user_answer ?? null;
              const correct = q.correct_answer;
              const isCorrect = user === correct;

              return (
                <li
                  key={i}
                  className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm"
                >
                  {/* Question */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm text-gray-500">Q{i + 1}</div>
                    <h4
                      className="flex-1 font-medium text-gray-900"
                      dangerouslySetInnerHTML={{ __html: q.question }}
                    />
                    <span
                      className={`ml-3 shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs border ${
                        isCorrect
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  {/* Answers */}
                  <div className="mt-3 grid sm:grid-cols-2 gap-2">
                    <div
                      className={`rounded-xl border p-3 text-sm ${
                        isCorrect
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : "bg-rose-50 border-rose-200 text-rose-800"
                      }`}
                    >
                      <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                        Your answer
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: user ? user : "—",
                        }}
                      />
                    </div>

                    {!isCorrect && (
                      <div className="rounded-xl border p-3 text-sm bg-emerald-50 border-emerald-200 text-emerald-800">
                        <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                          Correct answer
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: correct }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Optional metadata chips */}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {q.category && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                        {q.category}
                      </span>
                    )}
                    {q.difficulty && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200">
                        Difficulty: {q.difficulty}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
