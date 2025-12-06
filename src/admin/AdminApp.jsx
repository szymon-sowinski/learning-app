import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Dashboard from './Dashboard';
import WordsManager from './WordsManager';
import Settings from './Settings';

export default function AdminApp() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  if (!token) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="words" element={<WordsManager />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}