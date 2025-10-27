import React, { useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { QuizContext } from "./context/QuizContext.jsx";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Temporary stubs to avoid undefined component errors (remove when real pages exist)
const QuizScreen = () => <div className="p-6">Quiz Screen</div>;
const ResultScreen = () => <div className="p-6">Result Screen</div>;

/* ------------------------------ helpers ------------------------------ */
function shuffle(arr) {
  // simple UI shuffle
  return arr
    .map((v) => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(({ v }) => v);
}

export default function App() {
  const navigate = useNavigate();
  const { quizConfig } = useContext(QuizContext);

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [error, setError] = useState(null);

  const [quizState, setQuizState] = useState({
    status: "idle", // 'idle' | 'loading' | 'ready' | 'finished'
    questions: [],
    index: 0,
    score: 0,
  });

  const [history, setHistory] = useState([]);
  const [lastRecord, setLastRecord] = useState(null); // for /result route

  /* --------------------------- bootstrap data --------------------------- */
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        setCategories(data.trivia_categories || []);
      } catch {
        setError("Failed to load categories");
      } finally {
        setLoadingCats(false);
      }
    }

    const saved = JSON.parse(localStorage.getItem("quiz_history") || "[]");
    setHistory(saved);
    loadCategories();
  }, []);

  /* --------------------------- API URL builder -------------------------- */
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("amount", String(quizConfig.amount || 10));
    if (quizConfig.category) params.set("category", String(quizConfig.category));
    if (quizConfig.difficulty) params.set("difficulty", String(quizConfig.difficulty));
    params.set("type", "multiple");
    return `https://opentdb.com/api.php?${params.toString()}`;
  }, [quizConfig]);

  /* ------------------------------- actions ------------------------------ */
  async function startQuiz() {
    setError(null);
    setQuizState((prev) => ({ ...prev, status: "loading", questions: [], index: 0, score: 0 }));

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      // OpenTDB returns response_code (0=OK)
      if (!data || data.response_code !== 0 || !Array.isArray(data.results) || data.results.length === 0) {
        setError("No questions available. Try a different category or difficulty.");
        setQuizState({ status: "idle", questions: [], index: 0, score: 0 });
        return;
      }

      const normalized = data.results.map((q) => ({
        ...q,
        all_answers: shuffle([q.correct_answer, ...(q.incorrect_answers || [])]),
        user_answer: null,
      }));

      setQuizState({ status: "ready", questions: normalized, index: 0, score: 0 });
      navigate("/quiz");
    } catch {
      setError("Failed to fetch quiz questions");
      setQuizState({ status: "idle", questions: [], index: 0, score: 0 });
    }
  }

  // Called when user picks an answer; we DO NOT auto-advance here.
  function selectAnswer(isCorrect, answer) {
    setQuizState((prev) => {
      const updated = [...prev.questions];
      const i = prev.index;
      if (updated[i]) {
        updated[i] = { ...updated[i], user_answer: answer };
      }
      return {
        ...prev,
        questions: updated,
        score: isCorrect ? prev.score + 1 : prev.score,
      };
    });
  }

  function nextQuestion() {
    setQuizState((prev) => {
      const next = prev.index + 1;
      if (next < prev.questions.length) {
        return { ...prev, index: next };
      }
      // end of quiz
      finishQuiz(prev);
      return prev; // state will be updated in finishQuiz
    });
  }

  function finishQuiz(stateSnapshot) {
    const snapshot = stateSnapshot || quizState; // allow call with the latest state
    const categoryName =
      categories.find((c) => c.id === Number(quizConfig.category))?.name || "Any";

    const record = {
      date: new Date().toISOString(),
      category: categoryName,
      difficulty: quizConfig.difficulty || "any",
      amount: quizConfig.amount || 10,
      score: snapshot.score,
      total: snapshot.questions.length,
    };

    const updated = [record, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem("quiz_history", JSON.stringify(updated));
    setLastRecord(record);

    setQuizState((prev) => ({ ...prev, status: "finished" }));
    navigate("/result"); // now we have a dedicated route
  }

  function resetToHome() {
    setQuizState({ status: "idle", questions: [], index: 0, score: 0 });
    navigate("/home");
  }

  const currentQuestion =
    quizState.questions && quizState.questions.length > 0
      ? quizState.questions[quizState.index]
      : null;

  /* --------------------------------- UI --------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-6 w-full">
        <Routes>
          {/* Auth & Dashboard */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Home */}
          <Route
            path="/home"
            element={
              <Home
                categories={categories}
                loadingCats={loadingCats}
                history={history}
                onStart={startQuiz}
              />
            }
          />

          {/* Quiz Flow */}
          <Route
            path="/quiz"
            element={
              error ? (
                <ErrorMessage message={error} />
              ) : quizState.status === "loading" ? (
                <Loader />
              ) : quizState.status === "ready" && currentQuestion ? (
                <Quiz
                  question={currentQuestion}
                  index={quizState.index}
                  total={quizState.questions.length}
                  onSelect={selectAnswer}   // (isCorrect, answer)
                  onNext={nextQuestion}
                  score={quizState.score}
                />
              ) : quizState.status === "finished" ? (
                // If user lands on /quiz with finished state, show result shortcut
                <Result
                  record={{ score: quizState.score, total: quizState.questions.length }}
                  onRetake={resetToHome}
                  questions={quizState.questions}
                />
              ) : (
                // Idle / no data: send to Home UI
                <Home
                  categories={categories}
                  loadingCats={loadingCats}
                  history={history}
                  onStart={startQuiz}
                />
              )
            }
          />

          {/* Dedicated Result route (fixes previous navigate('/result') blank page) */}
          <Route
            path="/result"
            element={
              <Result
                record={lastRecord || { score: quizState.score, total: quizState.questions.length }}
                onRetake={resetToHome}
                questions={quizState.questions}
              />
            }
          />

          {/* Optional stubs */}
          <Route path="/quizscreen" element={<QuizScreen />} />
          <Route path="/resultscreen" element={<ResultScreen />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Home
                categories={categories}
                loadingCats={loadingCats}
                history={history}
                onStart={startQuiz}
              />
            }
          />
        </Routes>
      </main>

      <footer className="mt-4 text-center text-sm text-gray-500">
        Built with ❤️ using React + Tailwind — Quiz data from Open Trivia DB
      </footer>
    </div>
  );
}
