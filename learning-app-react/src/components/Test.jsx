import { useState } from "react";

export default function Test({ currentWord, setCurrentWord, randomWord, setMode, showIntelligent, setShowIntelligent }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (answer.toLowerCase() === currentWord[0].toLowerCase()) {
      alert("✔ Poprawna odpowiedź!");
    } else {
      alert(`❌ Błędna! Poprawnie: ${currentWord[0]}`);
      setShowIntelligent(currentWord);
    }
    setAnswer("");
    randomWord();
  };

  return (
    <div id="app">
      <h2>✍ Test</h2>
      <div className="word">{currentWord[1]}</div>
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Wpisz tłumaczenie" />
      <button onClick={handleSubmit}>Sprawdź</button>
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}