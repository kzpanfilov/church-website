import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminPages from './AdminPages';
import AdminNews from './AdminNews';
import AdminGallery from './AdminGallery';
import AdminAnnouncements from './AdminAnnouncements';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!localStorage.getItem('token')) {
    return <Navigate to="/admin/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>&#9881; Админ-панель</h3>
        <NavLink to="/admin" end>Главная</NavLink>
        <NavLink to="/admin/pages">Страницы</NavLink>
        <NavLink to="/admin/news">Новости</NavLink>
        <NavLink to="/admin/gallery">Галерея</NavLink>
        <NavLink to="/admin/announcements">Объявления</NavLink>
        <a href="/" target="_blank" rel="noopener noreferrer">&#128269; На сайт</a>
        <a onClick={handleLogout} style={{ cursor: 'pointer' }}>&#128682; Выйти</a>
        {user.displayName && (
          <div style={{ padding: '12px 20px', marginTop: 'auto', fontSize: '0.8rem', opacity: 0.6 }}>
            {user.displayName}
          </div>
        )}
      </aside>
      <main className="admin-content">
        <Routes>
          <Route index element={<AdminHome />} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </main>
    </div>
  );
}

function AdminHome() {
  return (
    <div>
      <h2>Добро пожаловать в админ-панель</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 20 }}>
        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <h3>&#128196;</h3>
          <p>Страницы</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <h3>&#128240;</h3>
          <p>Новости</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <h3>&#128247;</h3>
          <p>Галерея</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <h3>&#128227;</h3>
          <p>Объявления</p>
        </div>
      </div>
    </div>
  );
}
