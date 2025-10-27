// src/pages/Quiz.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "../components/ProgressBar";

export default function Quiz({ question, index, total, onSelect, onNext, score }) {
  const safeQuestion = question || {
    question: "Loading…",
    correct_answer: "",
    all_answers: [],
    category: "",
    difficulty: "",
  };

  const [selected, setSelected] = useState(safeQuestion.user_answer || null);

  useEffect(() => {
    setSelected(safeQuestion.user_answer || null);
  }, [safeQuestion]);

  function handleChoose(ans) {
    setSelected(ans);
    const isCorrect = ans === safeQuestion.correct_answer;
    onSelect?.(isCorrect, ans); // ⬅️ send both
  }

  const progress = useMemo(
    () => ((index + 1) / Math.max(total || 1, 1)) * 100,
    [index, total]
  );

  // If no questions came back, show a friendly message instead of blank
  if (!total || !safeQuestion || !Array.isArray(safeQuestion.all_answers)) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl border bg-white p-6 text-center">
        <h2 className="font-heading text-lg text-gray-900">No questions available</h2>
        <p className="text-sm text-gray-600 mt-1">
          Try a different category or difficulty, then start again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressBar progress={progress} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border bg-purplePrimary/10 text-purplePrimary border-purplePrimary/20">
            Q {index + 1} / {total}
          </span>
          {safeQuestion.category ? (
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
              {safeQuestion.category}
            </span>
          ) : null}
          {safeQuestion.difficulty ? (
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200">
              Difficulty: {safeQuestion.difficulty}
            </span>
          ) : null}
        </div>
        <div className="font-medium text-gray-700">Score: {score}</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={safeQuestion.question}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-4 rounded-2xl bg-white border shadow-sm p-6"
        >
          <h2
            className="font-heading text-xl text-gray-900"
            dangerouslySetInnerHTML={{ __html: safeQuestion.question }}
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {(safeQuestion.all_answers || []).map((ans, i) => {
              const isSelected = selected === ans;
              return (
                <motion.button
                  key={`${i}-${ans}`}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoose(ans)}
                  className={[
                    // base
                    "text-left rounded-xl border p-3 transition focus:outline-none focus-visible:ring-2",
                    "bg-white text-gray-900", // ⬅️ force readable text on white base
                    // variants
                    isSelected
                      ? "border-purplePrimary bg-purplePrimary/10 focus-visible:ring-purplePrimary/40"
                      : "border-gray-200 hover:bg-purplePrimary/5 focus-visible:ring-purplePrimary/30",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={[
                        "mt-1 inline-flex size-4 shrink-0 rounded-full ring-1",
                        isSelected ? "bg-purplePrimary ring-purplePrimary" : "bg-white ring-gray-300",
                      ].join(" ")}
                    />
                    <span
                      className="text-sm leading-snug text-gray-900" // ⬅️ force readable text
                      dangerouslySetInnerHTML={{ __html: ans }}
                    />
                  </div>
                </motion.button>
              );
                })}

          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {selected ? "Answer selected — you can change it before continuing." : "Pick an answer to continue."}
            </div>

            <motion.button
              whileHover={{ scale: selected ? 1.03 : 1 }}
              whileTap={{ scale: selected ? 0.97 : 1 }}
              type="button"
              disabled={!selected}
              onClick={onNext}
              className={[
                "inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-medium transition",
                selected ? "bg-purplePrimary text-white hover:opacity-90" : "bg-gray-200 text-gray-500 cursor-not-allowed",
              ].join(" ")}
            >
              {index + 1 === total ? "Finish Quiz" : "Next →"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
