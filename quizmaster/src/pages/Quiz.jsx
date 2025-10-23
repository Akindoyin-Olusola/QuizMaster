import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "../components/ProgressBar";

export default function Quiz({ question, index, total, onSelect, onNext, score }) {
  const [selected, setSelected] = useState(question.user_answer || null);

  // Reset selection when the question changes
  useEffect(() => {
    setSelected(question.user_answer || null);
  }, [question]);

  function handleChoose(ans) {
    setSelected(ans);
    const isCorrect = ans === question.correct_answer;
    onSelect(isCorrect);
  }

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Header */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600 mt-4">
        <span>
          Question {index + 1} / {total}
        </span>
        <span className="font-medium">Score: {score}</span>
      </div>

      {/* Animated question block */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.question} // triggers animation when question changes
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="p-6 bg-white rounded-2xl shadow-md mt-6 text-left"
        >
          {/* Question */}
          <h2
            className="text-xl font-semibold mb-4 text-gray-800"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />

          {/* Answer options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.all_answers.map((ans, i) => {
              const isSelected = selected === ans;
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChoose(ans)}
                  className={`text-left rounded-xl p-3 border transition duration-200 ${
                    isSelected
                      ? "border-purple-600 bg-purple-50 text-purple-800"
                      : "bg-gray-50 hover:bg-purple-100"
                  }`}
                  dangerouslySetInnerHTML={{ __html: ans }}
                />
              );
            })}
          </div>

          {/* Next / Finish Button */}
          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
            >
              {index + 1 === total ? "Finish Quiz" : "Next →"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
