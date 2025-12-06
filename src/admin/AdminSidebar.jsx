import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './admin.css';

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/admin"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <FaTachometerAlt style={{ marginRight: '8px' }} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/words"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <FaBook style={{ marginRight: '8px' }} />
          Słówka
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <FaCog style={{ marginRight: '8px' }} />
          Ustawienia
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem('admin_token');
            window.location.href = '/learning-app';
          }}
        >
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Wyloguj
        </button>
      </div>
    </aside>
  );
}