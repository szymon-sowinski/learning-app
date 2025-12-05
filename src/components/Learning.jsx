import { useState } from "react";

export default function Learning({ currentWord, setCurrentWord, randomWord, setMode, difficult, setDifficult }) {
  const [showPopup, setShowPopup] = useState(false);

  const nextWord = () => randomWord();

  const markDifficult = () => {
  const pair = [currentWord[0], currentWord[1]];
  if (!difficult.some(d => d[0] === currentWord[0])) {
    setDifficult([...difficult, pair]);
    setShowPopup("added");
  } else {
    setShowPopup("exists");
  }
  setTimeout(() => setShowPopup(false), 1000);
};

  return (
    <div id="app" style={{ position: "relative" }}>
      <h2>📘 Nauka</h2>
      <div className="word">{currentWord[1]}</div>
      <div className="small">Tłumaczenie:</div>
      <div className="translation">{currentWord[0]}</div>
      <button onClick={nextWord}>Następne słówko</button>
      <button onClick={markDifficult}>Dodaj do trudnych</button>
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>

      {showPopup && (
        <div style={{
          position: "absolute",
          top: "-70px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: showPopup === "added" ? "#4CAF50" : "#FF9800",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
          transition: "opacity 0.5s ease-in-out",
          opacity: 1
        }}>
          {showPopup === "added" ? "Dodano do trudnych ✔" : "Słówko już jest w trudnych"}
        </div>
      )}
    </div>
  );
}