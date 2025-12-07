import { useState, useEffect } from "react";

export default function Quiz({ currentWord, setCurrentWord, randomWord, setMode, showIntelligent, setShowIntelligent, words }) {
  const [options, setOptions] = useState([]);

  const generateOptions = (word) => {
    const temp = [word[0]];
    while (temp.length < 4) {
      const randomIdx = Math.floor(Math.random() * words.length);
      const newWord = words[randomIdx][0];
      if (!temp.includes(newWord)) temp.push(newWord);
    }
    return temp.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (currentWord) setOptions(generateOptions(currentWord));
  }, [currentWord]);

  const handleAnswer = (answer) => {
    if (answer === currentWord[0]) {
      alert("✔ Poprawna odpowiedź!");
    } else {
      alert(`❌ Błędna! Poprawnie: ${currentWord[0]}`);
      setShowIntelligent(currentWord);
    }
    const newWord = randomWord();
    setOptions(generateOptions(newWord));
  };

  if (!currentWord) return null;

  return (
    <div id="app">
      <h2>🧩 Quiz</h2>
      <div className="word">{currentWord[1]}</div>
      {options.map((opt, idx) => (
        <button key={idx} onClick={() => handleAnswer(opt)}>{opt}</button>
      ))}
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}