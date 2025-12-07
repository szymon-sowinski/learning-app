import { useState, useRef } from "react";

export default function Test({ currentWord, setCurrentWord, randomWord, setMode, showIntelligent, setShowIntelligent }) {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === currentWord[1].toLowerCase()) {
      alert(`✔ Poprawna odpowiedź!\n${currentWord[0]} = ${currentWord[1]}`);
    } else {
      alert(`❌ Błędna odpowiedź!\nPoprawnie: ${currentWord[0]} = ${currentWord[1]}`);
      setShowIntelligent(currentWord);
    }

    setAnswer("");
    randomWord();
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
      <div className="word">{currentWord[0]}</div>

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

      <button onClick={handleSubmit}>Sprawdź</button>
      <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
    </div>
  );
}