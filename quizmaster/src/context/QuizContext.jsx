import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // single source of truth for quiz config
  const [quizConfig, setQuizConfig] = useState({
    category: "",
    difficulty: "easy",
    amount: 10,
  });

  // quiz runtime state (optional to use elsewhere)
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const resetQuiz = () => {
    setQuestions([]);
    setScore(0);
    setProgress(0);
  };

  return (
    <QuizContext.Provider
      value={{
        user,
        setUser,
        quizConfig,
        setQuizConfig,
        questions,
        setQuestions,
        score,
        setScore,
        progress,
        setProgress,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
