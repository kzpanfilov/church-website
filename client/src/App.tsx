import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PageView from './pages/PageView';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import ChildrenCenter from './pages/ChildrenCenter';
import LoginPage from './admin/LoginPage';
import AdminDashboard from './admin/AdminDashboard';
import './styles/global.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <div className="header-top">
          <h1>&#9768; Храм святого благоверного князя Александра Невского</h1>
          <div className="subtitle">п. Зубчаниновка, г. Самара</div>
        </div>
        <nav className="nav">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/about">О храме</NavLink>
          <NavLink to="/schedule">Расписание</NavLink>
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/gallery">Галерея</NavLink>
          <NavLink to="/children">Детский центр</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          <NavLink to="/admin">Админка</NavLink>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>&copy; 2024 Храм Александра Невского в Зубчаниновке, г. Самара</p>
        <p style={{ marginTop: 4, fontSize: '0.8rem' }}>
          ул. Транзитная, 111А | Тел.: <a href="tel:+78469312071">+7 (846) 931-20-71</a>
        </p>
      </footer>
    </>
  );
}

function PublicRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PageView slug="about" />} />
        <Route path="/schedule" element={<PageView slug="schedule" />} />
        <Route path="/contacts" element={<PageView slug="contacts" />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/children" element={<ChildrenCenter />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
