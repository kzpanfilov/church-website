import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Home from './pages/Home';
import PageView from './pages/PageView';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import ChildrenCenter from './pages/ChildrenCenter';
import ContactsPage from './pages/ContactsPage';
import DonationsPage from './pages/DonationsPage';
import HistoryPage from './pages/HistoryPage';
import SchedulePage from './pages/SchedulePage';
import LoginPage from './admin/LoginPage';
import AdminDashboard from './admin/AdminDashboard';
import './styles/global.css';

function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button className="theme-toggle" onClick={() => setDark(d => !d)} title={dark ? 'Светлая тема' : 'Тёмная тема'}>
      {dark ? '\u2600' : '\u263E'}
    </button>
  );
}

function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const showSolid = solid || !isHome;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`header ${showSolid ? 'header--solid' : 'header--transparent'}`}>
      <div className="header-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Меню">
            <span /><span /><span />
          </button>
          <div>
            <h1>&#9768; Храм Александра Невского</h1>
            <div className="subtitle">п. Зубчаниновка, г. Самара</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="tel:+78469312071" style={{ fontSize: '0.82rem', transition: 'color .4s' }}>
            +7 (846) 931-20-71
          </a>
          <ThemeToggle />
        </div>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={closeMenu}>Главная</NavLink>
        <NavLink to="/about" onClick={closeMenu}>О храме</NavLink>
        <NavLink to="/history" onClick={closeMenu}>История</NavLink>
        <NavLink to="/schedule" onClick={closeMenu}>Расписание</NavLink>
        <NavLink to="/news" onClick={closeMenu}>Новости</NavLink>
        <NavLink to="/gallery" onClick={closeMenu}>Галерея</NavLink>
        <NavLink to="/children" onClick={closeMenu}>Детский центр</NavLink>
        <NavLink to="/donations" onClick={closeMenu}>Пожертвовать</NavLink>
        <NavLink to="/contacts" onClick={closeMenu}>Контакты</NavLink>
        <a href="/admin.html" className="nav-login" onClick={closeMenu}>Вход для администратора</a>
      </nav>
    </header>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="main" style={{ paddingTop: 0 }}>{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h4>Храм Александра Невского</h4>
            <p>
              ул. Транзитная, 111А<br />
              п. Зубчаниновка, г. Самара<br />
              <a href="tel:+78469312071">+7 (846) 931-20-71</a>
            </p>
            <p style={{ marginTop: 16 }}>
              Настоятель: <strong style={{ color: 'rgba(255,255,255,.8)' }}>протоиерей Владимир Болдырев</strong><br />
              <a href="tel:+79022927136">+7 (902) 292-71-36</a>
            </p>
          </div>
          <div>
            <h4>Расписание</h4>
            <p>
              Пт 17:00 — вечерня<br />
              Вс 9:00 — литургия<br />
              Вс 17:00 — акафист
            </p>
          </div>
          <div>
            <h4>Ссылки</h4>
            <p>
              <a href="https://vk.com/club217831518" target="_blank" rel="noopener noreferrer">ВКонтакте</a><br />
              <a href="https://xn--d1acwg1ap.xn--p1ai/filialy/23-filialy/174-uchebnyj-filial-nevskij" target="_blank" rel="noopener noreferrer">Филиал «Невский»</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Храм Александра Невского в Зубчаниновке, г. Самара
        </div>
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
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/donations" element={<DonationsPage />} />
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
