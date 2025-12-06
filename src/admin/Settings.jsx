import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({ quizLimit: 10, showTranslations: true });

  return (
    <div className="admin-panel">
      <h2>Ustawienia aplikacji</h2>
      <p>Ustawienia panelu admina.</p>
    </div>
  );
}