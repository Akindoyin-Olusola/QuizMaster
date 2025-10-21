import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // User authentication state
  const [user, setUser] = useState(null);

  // Quiz configuration (category, difficulty, amount)
  const [quizConfig, setQuizConfig] = useState({
    category: "",
    difficulty: "",
    amount: 10,
  });

  // Quiz progress and scoring
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  // Reset quiz data
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
