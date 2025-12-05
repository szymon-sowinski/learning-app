import { useEffect, useState } from "react";

export default function Difficult({ currentWord, setCurrentWord, difficult, setDifficult, setMode }) {
  const [index, setIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (difficult.length > 0) {
      setCurrentWord(difficult[index]);
    } else {
      setCurrentWord(null);
    }
  }, [difficult, index, setCurrentWord]);

  const nextWord = () => {
    if (difficult.length === 0) return;
    setIndex((prev) => (prev + 1) % difficult.length);
  };

  const removeDifficult = () => {
    if (!currentWord) return;
    const newDifficult = difficult.filter(word => word[0] !== currentWord[0]);
    setDifficult(newDifficult);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);

    if (newDifficult.length === 0) {
      setCurrentWord(null);
      setIndex(0);
    } else {
      setIndex((prev) => prev % newDifficult.length);
    }
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    marginRight: '5px'
  };

  return (
    <div id="app" style={{ position: 'relative' }}>
      <h2>⚠ Trudne słówka</h2>
      {difficult.length === 0 || !currentWord ? (
        <p style={{ color: "#000" }}>Brak trudnych słówek ✔</p>
      ) : (
        <>
          <div className="word">{currentWord[0]}</div>
          <div className="translation">{currentWord[1]}</div>
          <button onClick={nextWord} style={{ ...buttonStyle, backgroundColor: '#2196F3' }}>Następne słówko</button>
          <button onClick={removeDifficult} style={{ ...buttonStyle, backgroundColor: '#f44336' }}>Usuń ze słówek trudnych</button>
        </>
      )}
      <button className="back" onClick={() => setMode("menu")} style={{ ...buttonStyle, backgroundColor: '#607D8B' }}>⏪ Menu</button>

      {showPopup && (
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
          Słówko zostało usunięte z trudnych ✔
        </div>
      )}
    </div>
  );
}