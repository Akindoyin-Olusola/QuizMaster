import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizConfig, setQuizConfig] = useState({
    category: "",
    difficulty: "",
    amount: 10,
  });

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const resetQuiz = () => {
    setQuestions([]);
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        quizConfig,
        setQuizConfig,
        questions,
        setQuestions,
        score,
        setScore,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
