export default function Learning({ currentWord, setCurrentWord, randomWord, setMode, difficult, setDifficult }) {
  const nextWord = () => randomWord();

  const markDifficult = () => {
    if (!difficult.includes(currentWord[0])) setDifficult([...difficult, currentWord[0]]);
    alert("Dodano do trudnych ✔");
  };

  return (
    <div id="app">
      <h2>📘 Nauka</h2>
      <div className="word">{currentWord[1]}</div>
      <div className="small">Tłumaczenie:</div>
      <div className="translation">{currentWord[0]}</div>
      <button onClick={nextWord}>Następne słówko</button>
      <button onClick={markDifficult}>Dodaj do trudnych</button>
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}