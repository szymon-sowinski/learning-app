import { useState, useEffect } from "react";

export default function Quiz({ currentWord, setCurrentWord, randomWord, setMode, showIntelligent, setShowIntelligent, words }) {
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null); 

  const generateOptions = (word) => {
    const temp = [word[1]];
    while (temp.length < 4) {
      const randomIdx = Math.floor(Math.random() * words.length);
      const newWord = words[randomIdx][1];
      if (!temp.includes(newWord)) temp.push(newWord);
    }
    return temp.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (currentWord) setOptions(generateOptions(currentWord));
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  }, [currentWord]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(currentWord[1]);

    if (answer !== currentWord[1]) {
      setShowIntelligent(currentWord);
    }

    setTimeout(() => {
      const newWord = randomWord();
      setCurrentWord(newWord);
      setOptions(generateOptions(newWord));
      setSelectedAnswer(null);
      setCorrectAnswer(null);
    }, 1000);
  };

  if (!currentWord) return null;

  return (
    <div id="app">
      <h2>🧩 Quiz</h2>
      <div className="word">{currentWord[0]}</div>
      {options.map((opt, idx) => {
        let bgColor = "";
        if (selectedAnswer) {
          if (opt === correctAnswer) bgColor = "green";
          else if (opt === selectedAnswer && opt !== correctAnswer) bgColor = "red";
        }

        return (
          <button
            key={idx}
            onClick={() => !selectedAnswer && handleAnswer(opt)}
            style={{ backgroundColor: bgColor, color: bgColor ? "white" : "black" }}
          >
            {opt}
          </button>
        );
      })}
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}