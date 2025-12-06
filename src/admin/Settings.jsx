import { useState, useEffect } from 'react';
import './admin.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    quizLimit: 10,
    showTranslations: true,
    intelligentMode: true,
    theme: 'dark'
  });

  useEffect(() => {
    const saved = localStorage.getItem('app_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const saveSettings = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    alert('Ustawienia zapisane ✔');
  };

  return (
    <div className="admin-panel">
      <h2>⚙ Ustawienia aplikacji</h2>

      <div className="settings-row">
        <label>Ilość pytań w kartkówce:</label>
        <input
          type="number"
          min="1"
          value={settings.quizLimit}
          onChange={(e) => setSettings({ ...settings, quizLimit: Number(e.target.value) })}
        />
      </div>

      <div className="settings-row">
        <label>Pokazuj tłumaczenia:</label>
        <input
          type="checkbox"
          checked={settings.showTranslations}
          onChange={(e) => setSettings({ ...settings, showTranslations: e.target.checked })}
        />
      </div>

      <div className="settings-row">
        <label>Włącz tryb inteligentny:</label>
        <input
          type="checkbox"
          checked={settings.intelligentMode}
          onChange={(e) => setSettings({ ...settings, intelligentMode: e.target.checked })}
        />
      </div>

      <div className="settings-row">
        <label>Motyw:</label>
        <select
          value={settings.theme}
          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
        >
          <option value="dark">Ciemny</option>
          <option value="light">Jasny</option>
        </select>
      </div>

      <button className="admin-btn" onClick={saveSettings}>Zapisz ustawienia</button>
    </div>
  );
}