import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNews, getAnnouncements } from '../api/client';
import type { NewsItem, Announcement } from '../api/types';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    getNews(6).then(setNews).catch(() => {});
    getAnnouncements().then(setAnnouncements).catch(() => {});
  }, []);

  return (
    <div>
      <div className="hero">
        <h2>&#10013; Храм в честь благоверного князя Александра Невского</h2>
        <p>Духовный центр посёлка Зубчаниновка с 2001 года</p>
        <p style={{ marginTop: 8, fontSize: '0.95rem', opacity: 0.8 }}>
          ул. Транзитная, 111А, г. Самара
        </p>
      </div>

      {announcements.filter(a => a.linkUrl).length > 0 && (
        <div className="announcement-bar">
          {announcements.filter(a => a.linkUrl).map(a => (
            <div key={a.id} style={{ marginBottom: 8 }}>
              <h3>{a.title}</h3>
              <p>{a.content}</p>
              {a.linkUrl && (
                <a href={a.linkUrl} target="_blank" rel="noopener noreferrer">
                  {a.linkText || 'Подробнее'} &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 30 }}>
        <div className="card">
          <h3>&#128337; Расписание богослужений</h3>
          <p><strong>Пт:</strong> 17:00 — вечернее</p>
          <p><strong>Вс:</strong> 9:00 — Литургия, 17:00 — Акафист</p>
          <p style={{ marginTop: 8 }}><Link to="/schedule">Всё расписание &rarr;</Link></p>
        </div>
        <div className="card">
          <h3>&#128205; Контакты</h3>
          <p>ул. Транзитная, 111А</p>
          <p>п. Зубчаниновка, г. Самара</p>
          <p>Тел.: <a href="tel:+78469312071">+7 (846) 931-20-71</a></p>
          <p style={{ marginTop: 8 }}><Link to="/contacts">Все контакты &rarr;</Link></p>
        </div>
        <div className="card">
          <h3>&#127979; Детский центр «Невский»</h3>
          <p>Учебный филиал НФ «ДЕОЦ»</p>
          <p>Набор в ГКП-группу от 3 до 7 лет</p>
          <p style={{ marginTop: 8 }}><Link to="/children">Подробнее &rarr;</Link></p>
        </div>
      </div>

      {news.length > 0 && (
        <div>
          <h2 style={{ color: 'var(--primary-dark)', marginBottom: 16 }}>Новости</h2>
          <div className="news-grid">
            {news.map(n => (
              <div key={n.id} className={`news-card ${n.isFeatured ? 'featured' : ''}`}>
                {n.isFeatured && <span className="badge">Важное</span>}
                <div className="content">
                  <h3>{n.title}</h3>
                  <p>{n.summary}</p>
                  <div className="date">{new Date(n.publishedAt).toLocaleDateString('ru-RU')}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            <Link to="/news" className="btn btn-primary" style={{ display: 'inline-block', padding: '10px 24px' }}>
              Все новости
            </Link>
          </p>
        </div>
      )}

      <div className="card" style={{ marginTop: 30, textAlign: 'center', padding: 32 }}>
        <h2 style={{ marginBottom: 12 }}>&#9768; Добро пожаловать в наш храм!</h2>
        <p style={{ maxWidth: 700, margin: '0 auto', lineHeight: 1.8 }}>
          Храм в честь благоверного князя Александра Невского — духовный центр посёлка Зубчаниновка.
          Приглашаем вас на богослужения, в воскресную школу и детский образовательный центр.
          Будем рады видеть каждого!
        </p>
      </div>
    </div>
  );
}
