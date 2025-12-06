import { useState, useEffect } from "react";
import { words } from "../App";

export default function Dashboard() {
  const [difficultWords, setDifficultWords] = useState([]);

  useEffect(() => {
    const savedDifficult = JSON.parse(localStorage.getItem("difficult_words") || "[]");
    setDifficultWords(savedDifficult);
  }, []);

  return (
    <div className="admin-panel">
      <h2>📊 Dashboard</h2>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>📚 Wszystkie słówka</h3>
          <p>{words.length}</p>
        </div>
        <div className="card">
          <h3>⚠ Trudne słówka</h3>
          <p>{difficultWords.length}</p>
        </div>
        <div className="card">
          <h3>📈 Wykresy / Statystyki</h3>
          <p>Tu mogą być wykresy i dodatkowe dane.</p>
        </div>
      </div>
    </div>
  );
}