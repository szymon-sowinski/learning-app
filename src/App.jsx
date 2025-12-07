import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import PopQuiz from "./components/PopQuiz";
import Learning from "./components/Learning";
import Quiz from "./components/Quiz";
import Test from "./components/Test";
import Difficult from "./components/Difficult";
import IntelligentLearning from "./components/IntelligentLearning";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminApp from "./admin/AdminApp";
import "./App.css";

import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

const fetchCollections = async () => {
  const res = await axios.get("https://fiszki-api.tenco.waw.pl/collections");
  return res.data;
};

const fetchWords = async (groupId) => {
  const res = await axios.get(`https://fiszki-api.tenco.waw.pl/fiszki/${groupId}`);
  return res.data.map(item => [item.de, item.pl]);
};

function AppInner() {
  const [mode, setMode] = useState("menu");
  const [currentWord, setCurrentWord] = useState(null);
  const [difficult, setDifficult] = useState([]);
  const [showIntelligent, setShowIntelligent] = useState(null);
  const [groupId, setGroupId] = useState(1);

  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
    staleTime: 1000 * 60 * 5
  });

  const { data: words = [] } = useQuery({
    queryKey: ["words", groupId],
    queryFn: () => fetchWords(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5
  });

  const randomWord = (list = words) => {
    if (!list.length) return null;
    const idx = Math.floor(Math.random() * list.length);
    setCurrentWord(list[idx]);
    return list[idx];
  };

  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {mode === "menu" && <Menu setMode={setMode} randomWord={randomWord} />}
              {mode === "learning" && (
                <Learning
                  currentWord={currentWord}
                  setCurrentWord={setCurrentWord}
                  randomWord={randomWord}
                  setMode={setMode}
                  difficult={difficult}
                  setDifficult={setDifficult}
                />
              )}
              {mode === "quiz" && (
                <Quiz
                  currentWord={currentWord}
                  setCurrentWord={setCurrentWord}
                  randomWord={randomWord}
                  setMode={setMode}
                  showIntelligent={showIntelligent}
                  setShowIntelligent={setShowIntelligent}
                  words={words}
                />
              )}
              {mode === "test" && (
                <Test
                  currentWord={currentWord}
                  setCurrentWord={setCurrentWord}
                  randomWord={randomWord}
                  setMode={setMode}
                  showIntelligent={showIntelligent}
                  setShowIntelligent={setShowIntelligent}
                />
              )}
              {mode === "difficult" && (
                <Difficult
                  currentWord={currentWord}
                  setCurrentWord={setCurrentWord}
                  difficult={difficult}
                  setDifficult={setDifficult}
                  setMode={setMode}
                  randomWord={randomWord}
                />
              )}
              {mode === "intelligent" && <IntelligentLearning setMode={setMode} words={words} />}
              {mode === "popQuiz" && <PopQuiz setMode={setMode} words={words} />}

              <select onChange={(e) => setGroupId(e.target.value)}>
                {collections?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
