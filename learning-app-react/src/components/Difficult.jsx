export default function Difficult({ currentWord, setCurrentWord, difficult, setDifficult, setMode, randomWord }) {
  const [index, setIndex] = useState(0);

  const nextWord = () => {
    const nextIndex = (index + 1) % difficult.length;
    setIndex(nextIndex);
    setCurrentWord([difficult[nextIndex], ""]);
  };

  return (
    <div id="app">
      <h2>⚠ Trudne słówka</h2>
      {difficult.length === 0 ? (
        <p>Brak trudnych słówek ✔</p>
      ) : (
        <>
          <div className="word">{currentWord[1]}</div>
          <div className="translation">{currentWord[0]}</div>
          <button onClick={nextWord}>Następne słówko</button>
        </>
      )}
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}