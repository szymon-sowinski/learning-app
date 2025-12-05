import { useState, useEffect } from "react";
import { words } from "../App";

export default function IntelligentLearning({ setMode }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [guessedAnswer, setGuessedAnswer] = useState("");
  const [wordScores, setWordScores] = useState({});

  useEffect(() => {
    const scores = {};
    words.forEach(([de, pl]) => {
      scores[de] = 1;
    });
    setWordScores(scores);
  }, []);

  const randomWord = () => {
    const weightedWords = [];
    for (const [de, pl] of words) {
      const score = wordScores[de] || 1;
      for (let i = 0; i < Math.max(1, score); i++) {
        weightedWords.push([de, pl]);
      }
    }
    const idx = Math.floor(Math.random() * weightedWords.length);
    setCurrentWord(weightedWords[idx]);
    setShowAnswer(false);
    setGuessedAnswer("");
  };

  useEffect(() => {
    if (Object.keys(wordScores).length > 0) randomWord();
  }, [wordScores]);

  const handleDifficulty = (level) => {
    const de = currentWord[0];
    const newScores = { ...wordScores };
    switch (level) {
      case "łatwe":
        newScores[de] = Math.max(1, (newScores[de] || 1) - 1);
        break;
      case "średnie":
        newScores[de] = newScores[de] || 1;
        break;
      case "trudne":
        newScores[de] = (newScores[de] || 1) + 2; 
        break;
    }
    setWordScores(newScores);
    randomWord();
  };

  if (!currentWord) return null;

  return (
    <div id="app">
      <h2>🤖 Tryb inteligentny</h2>

      <div className="word">Polskie słowo: {currentWord[1]}</div>

      {!showAnswer ? (
        <>
          <input
            type="text"
            placeholder="Spróbuj zgadnąć"
            value={guessedAnswer}
            onChange={(e) => setGuessedAnswer(e.target.value)}
          />
          <button onClick={() => {
            if (guessedAnswer.trim().toLowerCase() === currentWord[0].toLowerCase()) {
              alert("✔ Poprawna odpowiedź!");
            }
            setShowAnswer(true);
          }}>Pokaż odpowiedź</button>
        </>
      ) : (
        <>
          <div className="translation">Poprawna odpowiedź: {currentWord[0]}</div>
          <div>Oceń trudność słówka:</div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => handleDifficulty("łatwe")} style={{ marginRight: '5px' }}>Łatwe</button>
            <button onClick={() => handleDifficulty("średnie")} style={{ marginRight: '5px' }}>Średnie</button>
            <button onClick={() => handleDifficulty("trudne")} style={{ marginRight: '5px' }}>Trudne</button>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button onClick={randomWord} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Dalej →</button>
          </div>
        </>
      )}

      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}