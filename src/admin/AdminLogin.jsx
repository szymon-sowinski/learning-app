import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

export default function AdminLogin() {
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const expected = 'admin'; 
    if (pass === expected) {
      localStorage.setItem('admin_token', 'OK');
      navigate('/admin');
    } else {
      setError('❌ Błędne hasło');
      setPass('');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>🔒 Panel Administracyjny</h2>
        <p className="admin-login-note">Wprowadź hasło, aby zalogować się do panelu.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Hasło"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="admin-input"
              required
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>

          <button type="submit" className="admin-btn">
            Zaloguj
          </button>
        </form>

        {error && <div className="admin-error">{error}</div>}
      </div>
    </div>
  );
}