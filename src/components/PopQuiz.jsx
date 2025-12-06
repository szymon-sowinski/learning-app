import { useEffect, useState } from "react";
import { words } from "../App";

export default function Kartkowka({ setMode }) {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [writeQuestions, setWriteQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);

    const quizQ = shuffled.slice(0, 10);
    const writeQ = shuffled.slice(10, 20);

    const quizWithOptions = quizQ.map(([de, pl]) => {
      const options = [
        de,
        ...words
          .filter(w => w[1] !== pl)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w[0])
      ].sort(() => Math.random() - 0.5);

      return { pl, de, options };
    });

    setQuizQuestions(quizWithOptions);
    setWriteQuestions(writeQ);
  }, []);

  const totalSteps = 20;

  const handleQuizAnswer = (selected, correct) => {
    if (selected === correct) {
      setScore(prev => prev + 1);
    }
    setStep(step + 1);
  };

  const handleWriteAnswer = (correct) => {
    if (answer.trim().toLowerCase() === correct.toLowerCase()) {
      setScore(prev => prev + 1);
    }
    setAnswer("");
    setStep(step + 1);
  };

  if (quizQuestions.length === 0 || writeQuestions.length === 0) {
    return <div id="app"><p>Ładowanie kartkówki...</p></div>;
  }

  if (step === totalSteps) {
    const percent = Math.round((score / totalSteps) * 100);
    return (
      <div id="app">
        <h2 style={{color: '#000'}}>📊 Wynik kartkówki</h2>
        <h3>{percent}%</h3>
        <button className="back" onClick={() => setMode("menu")}>⏪ Powrót do menu</button>
      </div>
    );
  }

  if (step < 10) {
    const q = quizQuestions[step];
    return (
      <div id="app">
        <h2>📘 Pytanie {step + 1} / 20</h2>
        <div className="word">{q.pl}</div>

        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleQuizAnswer(opt, q.de)}>
            {opt}
          </button>
        ))}
      </div>
    );
  }

  const writeIndex = step - 10;
  const w = writeQuestions[writeIndex];

  return (
    <div id="app">
      <h2>✍ Pytanie {step + 1} / 20</h2>
      <div className="word">{w[1]}</div>

      <input
        type="text"
        placeholder="Wpisz tłumaczenie"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={() => handleWriteAnswer(w[0])}>Dalej →</button>
    </div>
  );
}