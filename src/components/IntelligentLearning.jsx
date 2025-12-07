import { useState, useEffect, useRef } from "react";

export default function IntelligentLearning({ setMode, words }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [guessedAnswer, setGuessedAnswer] = useState("");
  const [wordScores, setWordScores] = useState({});
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);
  const inputRef = useRef(null);

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

  const checkAnswer = () => {
    if (guessedAnswer.trim().toLowerCase() === currentWord[0].toLowerCase()) {
      setShowCorrectPopup(true);
      setTimeout(() => setShowCorrectPopup(false), 1500);
    }
    setShowAnswer(true);
  };

  const insertSpecialChar = (char) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newValue = guessedAnswer.slice(0, start) + char + guessedAnswer.slice(end);
    setGuessedAnswer(newValue);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  return (
    <div id="app" style={{ position: 'relative' }}>
      <h2>🤖 Tryb inteligentny</h2>

      <div className="word">Polskie słowo: {currentWord[1]}</div>

      {!showAnswer ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '5px' }}>
            <button onClick={() => insertSpecialChar("ä")} style={{ width: '40px', padding: '5px' }}>ä</button>
            <button onClick={() => insertSpecialChar("ö")} style={{ width: '40px', padding: '5px' }}>ö</button>
            <button onClick={() => insertSpecialChar("ü")} style={{ width: '40px', padding: '5px' }}>ü</button>
            <button onClick={() => insertSpecialChar("ß")} style={{ width: '40px', padding: '5px' }}>ß</button>
          </div>

          <input
            type="text"
            ref={inputRef}
            placeholder="Spróbuj zgadnąć"
            value={guessedAnswer}
            onChange={(e) => setGuessedAnswer(e.target.value)}
          />

          <button onClick={checkAnswer}>Pokaż odpowiedź</button>
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
        </>
      )}

      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>

      {showCorrectPopup && (
        <div style={{
          position: "absolute",
          top: "-70px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
          transition: "opacity 0.5s ease-in-out",
          opacity: 1
        }}>
          ✔ Poprawna odpowiedź!
        </div>
      )}
    </div>
  );
}