import { useState, useRef, useEffect } from "react";

export default function Test({ setMode, words }) {
  const [answer, setAnswer] = useState("");
  const [currentWord, setCurrentWord] = useState([]);
  const [correctCounts, setCorrectCounts] = useState({});
  const [remainingWords, setRemainingWords] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Inicjalizacja liczników i puli słów
    const counts = {};
    words.forEach((w) => (counts[w[0]] = 0));
    setCorrectCounts(counts);
    setRemainingWords([...words]);
    pickRandomWord([...words]);
  }, [words]);

  const pickRandomWord = (pool) => {
    if (pool.length === 0) {
      alert("🎉 Gratulacje! Udało Ci się przećwiczyć wszystkie słowa.");
      setMode("menu");
      return;
    }
    const index = Math.floor(Math.random() * pool.length);
    setCurrentWord(pool[index]);
  };

  const handleSubmit = () => {
    if (!currentWord.length) return;

    if (answer.trim().toLowerCase() === currentWord[1].toLowerCase()) {
      alert(`✔ Poprawna odpowiedź!\n${currentWord[0]} = ${currentWord[1]}`);

      // Aktualizacja liczników
      const updatedCounts = { ...correctCounts };
      updatedCounts[currentWord[0]] += 1;
      setCorrectCounts(updatedCounts);

      // Jeśli słowo odgadnięte 2 razy, usuń je z puli
      if (updatedCounts[currentWord[0]] >= 1) {
        const newRemaining = remainingWords.filter(w => w[0] !== currentWord[0]);
        setRemainingWords(newRemaining);
        pickRandomWord(newRemaining);
      } else {
        pickRandomWord(remainingWords);
      }
    } else {
      alert(`❌ Błędna odpowiedź!\nPoprawnie: ${currentWord[0]} = ${currentWord[1]}`);
      pickRandomWord(remainingWords);
    }

    setAnswer("");
  };

  const insertSpecialChar = (char) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newValue = answer.slice(0, start) + char + answer.slice(end);
    setAnswer(newValue);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  return (
    <div id="app">
      <h2>✍ Test</h2>

      {currentWord.length > 0 && <div className="word">{currentWord[0]}</div>}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '5px' }}>
        <button onClick={() => insertSpecialChar("ä")} style={{ width: '40px', padding: '5px' }}>ä</button>
        <button onClick={() => insertSpecialChar("ö")} style={{ width: '40px', padding: '5px' }}>ö</button>
        <button onClick={() => insertSpecialChar("ü")} style={{ width: '40px', padding: '5px' }}>ü</button>
        <button onClick={() => insertSpecialChar("ß")} style={{ width: '40px', padding: '5px' }}>ß</button>
      </div>

      <input
        type="text"
        ref={inputRef}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Wpisz tłumaczenie"
      />

      <div style={{ margin: '10px', fontSize: '0.85em', color: '#555' }}>
        Pozostało słów: {remainingWords.length} / {words.length}
      </div>

      <button onClick={handleSubmit}>Sprawdź</button>
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}
