import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import QuizScreen from "./pages/QuizScreen";
import ResultScreen from "./pages/ResultScreen";

export default function App() {
  // --- Quiz States ---
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ category: "", difficulty: "", amount: 10 });
  const [quizState, setQuizState] = useState({
    status: "idle",
    questions: [],
    index: 0,
    score: 0,
  });
  const [history, setHistory] = useState([]);

  // --- Load categories & history ---
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        setCategories(data.trivia_categories || []);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoadingCats(false);
      }
    }

    const savedHistory = JSON.parse(localStorage.getItem("quiz_history")) || [];
    setHistory(savedHistory);
    loadCategories();
  }, []);

  // --- Start Quiz ---
  async function startQuiz() {
    setQuizState((prev) => ({ ...prev, status: "loading" }));
    try {
      const url = `https://opentdb.com/api.php?amount=${form.amount}&category=${form.category}&difficulty=${form.difficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();
      setQuizState({ status: "ready", questions: data.results, index: 0, score: 0 });
    } catch {
      setError("Failed to fetch quiz questions");
      setQuizState({ status: "idle", questions: [], index: 0, score: 0 });
    }
  }

  // --- Select Answer ---
  function selectAnswer(isCorrect) {
    if (isCorrect) {
      setQuizState((prev) => ({ ...prev, score: prev.score + 1 }));
    }
    nextQuestion();
  }

  // --- Next Question ---
  function nextQuestion() {
    if (quizState.index + 1 < quizState.questions.length) {
      setQuizState((prev) => ({ ...prev, index: prev.index + 1 }));
    } else {
      finishQuiz();
    }
  }

  // --- Finish Quiz ---
  function finishQuiz() {
    const record = {
      date: new Date().toISOString(),
      category: categories.find((c) => c.id === Number(form.category))?.name || "Any",
      difficulty: form.difficulty,
      amount: form.amount,
      score: quizState.score,
      total: quizState.questions.length,
    };

    const updatedHistory = [record, ...history].slice(0, 20);
    setHistory(updatedHistory);
    localStorage.setItem("quiz_history", JSON.stringify(updatedHistory));
    setQuizState((prev) => ({ ...prev, status: "finished" }));
  }

  // --- Reset Quiz ---
  function resetToHome() {
    setQuizState({ status: "idle", questions: [], index: 0, score: 0 });
  }

  const currentQuestion = quizState.questions[quizState.index];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <Navbar />

        <main className="flex-grow max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-6 w-full">
          <Routes>
            {/* Auth & Dashboard */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Quiz Flow */}
            <Route
              path="/quiz"
              element={
                error ? (
                  <ErrorMessage message={error} />
                ) : quizState.status === "idle" ? (
                  <Home
                    categories={categories}
                    loadingCats={loadingCats}
                    form={form}
                    updateForm={setForm}
                    onStart={startQuiz}
                    history={history}
                  />
                ) : quizState.status === "loading" ? (
                  <Loader />
                ) : quizState.status === "ready" && currentQuestion ? (
                  <Quiz
                    question={currentQuestion}
                    index={quizState.index}
                    total={quizState.questions.length}
                    onSelect={selectAnswer}
                    onNext={nextQuestion}
                    score={quizState.score}
                  />
                ) : quizState.status === "finished" ? (
                  <Result
                    record={{ score: quizState.score, total: quizState.questions.length }}
                    onRetake={resetToHome}
                    questions={quizState.questions}
                  />
                ) : null
              }
            />

            {/* Optional separate result screens */}
            <Route path="/quizscreen" element={<QuizScreen />} />
            <Route path="/resultscreen" element={<ResultScreen />} />
          </Routes>
        </main>

        <footer className="mt-4 text-center text-sm text-gray-500">
          Built with ❤️ using React + Tailwind — Quiz data from Open Trivia DB
        </footer>
      </div>
    </Router>
  );
}
