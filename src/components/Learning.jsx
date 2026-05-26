import { useState } from "react";

export default function Learning({ setMode, words }) {
  const [showPopup, setShowPopup] = useState(false);
  const [pos, setPos] = useState(0)
  const wordsLen = words.length;

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
      <div className="small">{pos + 1} / {wordsLen}</div>
      <div className="word">{words[pos][0]}</div>
      <div className="small">Tłumaczenie:</div>
      <div className="translation">{words[pos][1]}</div>
      <button onClick={() => setPos(pos + 1 >= wordsLen ? 0 : pos + 1)}>Następne słówko</button>
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