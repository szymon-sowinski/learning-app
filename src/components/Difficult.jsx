import { useEffect, useState } from "react";

export default function Difficult({ currentWord, setCurrentWord, difficult, setDifficult, setMode, randomWord }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (difficult.length > 0 && !currentWord) {
      setCurrentWord([difficult[0], ""]);
    }
  }, [difficult, currentWord, setCurrentWord]);

  const nextWord = () => {
    if (difficult.length === 0) return;
    const nextIndex = (index + 1) % difficult.length;
    setIndex(nextIndex);
    setCurrentWord([difficult[nextIndex], ""]);
  };

  return (
    <div id="app">
      <h2>⚠ Trudne słówka</h2>
      {difficult.length === 0 ? (
        <p style={{ color: "#000" }}>Brak trudnych słówek ✔</p>
      ) : (
        <>
          <div className="word">{currentWord[1]}</div>
          <div className="translation">{currentWord[0]}</div>
          <button onClick={nextWord}>Następne słówko</button>
          <button onClick={() => {
            const newDifficult = difficult.filter(word => word !== currentWord[0]);
            setDifficult(newDifficult);
            if (newDifficult.length === 0) {
              setCurrentWord(null);
            } else {
              const nextIndex = index % newDifficult.length;
              setIndex(nextIndex);
              setCurrentWord([newDifficult[nextIndex], ""]);
            }
          }} style={{ marginLeft: '5px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
            Usuń ze słówek trudnych
          </button>
        </>
      )}
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}