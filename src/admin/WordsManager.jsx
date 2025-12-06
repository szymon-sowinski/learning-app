import { useState } from 'react';

export default function WordsManager() {
  const [words, setWords] = useState([]);

  return (
    <div className="admin-panel">
      <h2>Zarządzanie słówkami</h2>
      <p>Lista słówek pojawi się tutaj.</p>
      <ul>
        {words.map((w, i) => (
          <li key={i}>{w.de} — {w.pl}</li>
        ))}
      </ul>
    </div>
  );
}