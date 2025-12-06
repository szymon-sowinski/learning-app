import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>Admin</h2>
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/words">Słówka</Link>
        <Link to="/admin/settings">Ustawienia</Link>
      </nav>
      <button className="logout" onClick={() => { localStorage.removeItem('admin_token'); window.location.href = '/'; }}>Wyloguj</button>
    </aside>
  );
}
