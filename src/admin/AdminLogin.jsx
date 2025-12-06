import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const expected = import.meta.env.VITE_ADMIN_PASS || 'admin';
    if (pass === expected) {
      localStorage.setItem('admin_token', 'OK');
      navigate('/admin');
    } else {
      setError('Błędne hasło');
    }
  };

  return (
    <div className="admin-login">
      <h2>Panel administracyjny</h2>
      <form onSubmit={handleLogin}>
        <input type="password" placeholder="Hasło" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button type="submit">Zaloguj</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
