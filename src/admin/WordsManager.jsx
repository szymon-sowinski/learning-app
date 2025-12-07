import { useState, useEffect } from 'react';
import './admin.css';

export default function WordsManager() {


  return (
    <div className="admin-panel">
      <h2>📝 Zarządzanie słówkami</h2>

      <div className="words-actions">
        <input
          type="text"
          placeholder="Niemieckie"
        />
        <input
          type="text"
          placeholder="Polskie"
        />
        <button className="admin-btn">Export JSON</button>
        <input type="file" />
      </div>

      <input
        type="text"
        placeholder="Szukaj słówek..."
        style={{ margin: '10px 0', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
      />

      <div className="words-list">
      </div>
    </div>
  );
}