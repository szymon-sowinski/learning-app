import { useState, useEffect } from 'react';
import './admin.css';

export default function WordsManager() {
  const [words, setWords] = useState([]);
  const [form, setForm] = useState({ de: '', pl: '' });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('admin_words') || '[]');
    setWords(saved);
  }, []);

  const saveWords = (newWords) => {
    setWords(newWords);
    localStorage.setItem('admin_words', JSON.stringify(newWords));
  };

  const handleAdd = () => {
    if (!form.de || !form.pl) return alert('Wypełnij oba pola!');
    saveWords([...words, { de: form.de, pl: form.pl }]);
    setForm({ de: '', pl: '' });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm({ de: words[index].de, pl: words[index].pl });
  };

  const handleSaveEdit = () => {
    const newWords = [...words];
    newWords[editingIndex] = { de: form.de, pl: form.pl };
    saveWords(newWords);
    setEditingIndex(-1);
    setForm({ de: '', pl: '' });
  };

  const handleDelete = (index) => {
    const newWords = words.filter((_, i) => i !== index);
    saveWords(newWords);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(words, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'words.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed)) {
          saveWords(parsed);
        } else {
          alert('Niepoprawny format pliku JSON!');
        }
      } catch {
        alert('Błąd parsowania pliku!');
      }
    };
    reader.readAsText(file);
  };

  const filteredWords = words.filter(w =>
    w.de.toLowerCase().includes(search.toLowerCase()) ||
    w.pl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <h2>📝 Zarządzanie słówkami</h2>

      <div className="words-actions">
        <input
          type="text"
          placeholder="Niemieckie"
          value={form.de}
          onChange={(e) => setForm({ ...form, de: e.target.value })}
        />
        <input
          type="text"
          placeholder="Polskie"
          value={form.pl}
          onChange={(e) => setForm({ ...form, pl: e.target.value })}
        />
        {editingIndex === -1 ? (
          <button className="admin-btn" onClick={handleAdd}>Dodaj nowe</button>
        ) : (
          <button className="admin-btn" onClick={handleSaveEdit}>Zapisz edycję</button>
        )}
        <button className="admin-btn" onClick={handleExport}>Export JSON</button>
        <input type="file" onChange={handleImport} />
      </div>

      <input
        type="text"
        placeholder="Szukaj słówek..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: '10px 0', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
      />

      <div className="words-list">
        {filteredWords.map((w, i) => (
          <div key={i} className="word-row">
            <span className="pair">{w.de} — {w.pl}</span>
            <div className="row-actions">
              <button className="admin-btn" onClick={() => handleEdit(i)}>Edytuj</button>
              <button className="admin-btn" onClick={() => handleDelete(i)}>Usuń</button>
            </div>
          </div>
        ))}
        {filteredWords.length === 0 && <p>Brak słówek do wyświetlenia</p>}
      </div>
    </div>
  );
}