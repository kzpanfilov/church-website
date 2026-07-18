import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getNews, getAnnouncements, getScheduleEvents } from '../api/client';
import type { NewsItem, Announcement, ChurchEvent } from '../api/types';

const heroSlides = [
  { img: '/images/church-hero.jpg', title: 'Храм Александра Невского', desc: 'Духовный центр посёлка Зубчаниновка с 2001 года. Приглашаем на богослужения.' },
  { img: '/images/church-2.jpg', title: 'Расписание богослужений', desc: 'Пт 17:00 — Вечерня  ·  Сб 17:00 — Всенощная  ·  Вс 9:00 — Литургия  ·  Вс 17:00 — Акафист' },
  { img: '/images/church-interior.jpg', title: 'Детский центр «Невский»', desc: 'Набор детей от 3 до 7 лет. Художественное и духовно-просветительское направления.' },
  { img: '/images/church-4.jpg', title: 'Приходите в наш храм', desc: 'ул. Транзитная, 111А, п. Зубчаниновка, г. Самара. Тел.: +7 (846) 931-20-71' },
];

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    getNews(10).then(setNews).catch(() => {});
    getAnnouncements().then(setAnnouncements).catch(() => {});
    getScheduleEvents(50).then(setEvents).catch(() => {});
  }, []);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setActiveSlide(p => (p + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i: number) => {
    setActiveSlide(i);
    clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveSlide(p => (p + 1) % heroSlides.length);
    }, 5500);
  };

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weeklyNews = news.filter(n => new Date(n.publishedAt) >= weekAgo);

  return (
    <div>
      {/* HERO */}
      <div className="hero-slider">
        {heroSlides.map((s, i) => (
          <div key={i} className={`hero-slide ${i === activeSlide ? 'active' : ''}`}>
            <img src={s.img} alt={s.title} />
            <div className="overlay" />
          </div>
        ))}
        <div className="hero-content">
          <h2>{heroSlides[activeSlide].title}</h2>
          <p>{heroSlides[activeSlide].desc}</p>
          <Link to="/about" className="btn-hero">Подробнее</Link>
        </div>
        <div className="hero-arrows">
          <button className="hero-arrow" onClick={() => goTo((activeSlide - 1 + heroSlides.length) % heroSlides.length)}>&#8592;</button>
          <button className="hero-arrow" onClick={() => goTo((activeSlide + 1) % heroSlides.length)}>&#8594;</button>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero-dot ${i === activeSlide ? 'active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>

      {/* TICKER */}
      {weeklyNews.length > 0 && (
        <div className="news-ticker">
          <div className="news-ticker-inner">
            {weeklyNews.map((n) => (
              <span key={n.id}>{n.title} ({new Date(n.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })})</span>
            ))}
            {weeklyNews.map((n) => (
              <span key={`d-${n.id}`}>{n.title} ({new Date(n.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })})</span>
            ))}
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS */}
      {announcements.filter(a => a.linkUrl).length > 0 && (
        <div className="announcement-bar">
          {announcements.filter(a => a.linkUrl).map(a => (
            <div key={a.id}>
              <h3>{a.title}</h3>
              <p>{a.content}</p>
              {a.linkUrl && <a href={a.linkUrl} target="_blank" rel="noopener noreferrer">{a.linkText || 'Подробнее'} &rarr;</a>}
            </div>
          ))}
        </div>
      )}

      {/* LIVE BROADCAST */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="section-header">
          <h2>Онлайн-трансляция</h2>
          <p>Следите за богослужениями онлайн</p>
          <div className="accent-line" />
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', aspectRatio: '16/9', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)', fontSize: '0.9rem', border: '1px solid var(--border)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>&#9654;</div>
            <p>Трансляция будет доступна</p>
            <p style={{ fontSize: '0.78rem', marginTop: 4 }}>во время богослужений</p>
          </div>
        </div>
      </div>

      {/* SCHEDULE + CONTACTS */}
      <div className="section">
        <div className="section-header">
          <h2>Расписание и контакты</h2>
          <div className="accent-line" />
        </div>
        <div className="schedule-grid" style={{ marginBottom: 24 }}>
          {events.length > 0 ? (
            [5, 6, 0, 1, 2, 3, 4]
              .filter(dow => events.some(e => e.dayOfWeek === dow))
              .map(dow => {
                const dayEvents = events.filter(e => e.dayOfWeek === dow).sort((a, b) => {
                  const parse = (t: string) => { const [h, m] = (t || '0:0').split(':').map(Number); return h * 60 + (m || 0); };
                  return parse(a.time || '') - parse(b.time || '');
                });
                return dayEvents.map((ev, i) => (
                  <div key={ev.id} className="schedule-item">
                    {i === 0 && <div className="schedule-item__day">{['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][ev.dayOfWeek]}</div>}
                    {i > 0 && <div className="schedule-item__day" style={{ visibility: 'hidden' }}>{['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][ev.dayOfWeek]}</div>}
                    <p><strong>{ev.time}</strong> — {ev.title}</p>
                  </div>
                ));
              })
          ) : (
            <>
              <div className="schedule-item">
                <div className="schedule-item__day">Пятница</div>
                <p><strong>17:00</strong> — Вечерня</p>
              </div>
              <div className="schedule-item">
                <div className="schedule-item__day">Суббота</div>
                <p><strong>17:00</strong> — Всенощное бдение</p>
              </div>
              <div className="schedule-item">
                <div className="schedule-item__day">Воскресенье</div>
                <p><strong>8:00</strong> — Исповедь перед причастием</p>
                <p><strong>9:00</strong> — Божественная литургия</p>
                <p><strong>17:00</strong> — Акафист Александру Невскому</p>
              </div>
            </>
          )}
        </div>
        <p style={{ textAlign: 'center', marginBottom: 24 }}>
          <Link to="/schedule" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>Полное расписание &rarr;</Link>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border-light)' }}>
          <div className="card">
            <div className="card__label">Адрес</div>
            <p>ул. Транзитная, 111А<br />п. Зубчаниновка, г. Самара</p>
            <p style={{ marginTop: 8 }}>Тел.: <a href="tel:+78469312071">+7 (846) 931-20-71</a></p>
            <Link to="/contacts" className="link-arrow">Все контакты</Link>
          </div>
          <div className="card">
            <div className="card__label">Настоятель</div>
            <p><strong>Протоиерей Владимир Болдырев</strong></p>
            <p style={{ marginTop: 4 }}>Настоятель с 1993 года</p>
            <p><a href="tel:+79022927136">+7 (902) 292-71-36</a></p>
          </div>
          <div className="card">
            <div className="card__label">Детский центр</div>
            <p><strong>Учебный филиал «Невский»</strong></p>
            <p style={{ marginTop: 4 }}>Набор в ГКП-группу от 3 до 7 лет</p>
            <p><a href="tel:+79277594991">+7 (927) 759-49-91</a></p>
            <Link to="/children" className="link-arrow">Подробнее</Link>
          </div>
        </div>
      </div>

      {/* GALLERY - DARK */}
      <div className="section--dark">
        <div className="section__inner">
          <div className="section-header">
            <h2>Фотографии храма</h2>
            <div className="accent-line" />
          </div>
          <div className="photo-grid">
            <img src="/images/church-hero.jpg" alt="Храм Александра Невского — вид с улицы Транзитной" />
            <img src="/images/church-2.jpg" alt="Храм Александра Невского — главный вход" />
            <img src="/images/church-3.jpg" alt="Храм Александра Невского — колокольня" />
            <img src="/images/church-4.jpg" alt="Храм Александра Невского — территория" />
            <img src="/images/church-icon.jpg" alt="Мозаика Александра Невского на фасаде храма" />
            <img src="/images/church-interior.jpg" alt="Иконостас храма Александра Невского" />
          </div>
          <p style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/gallery" className="btn btn-gold">Вся галерея</Link>
          </p>
        </div>
      </div>

      {/* HISTORY TEASER */}
      <div className="section">
        <div className="section-header">
          <h2>История храма</h2>
          <p>От небольшой часовни до духовного центра</p>
          <div className="accent-line" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 1, background: 'var(--border-light)' }}>
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: 8 }}>1993</div>
            <p>Хиротония настоятеля протоиерея Владимира Болдырева</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: 8 }}>2000</div>
            <p>Строительство первого здания трапезной и воскресной школы</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: 8 }}>2022</div>
            <p>Открытие детского епархиального образовательного центра</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/history" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>Вся история &rarr;</Link>
        </p>
      </div>

      {/* NEWS */}
      {news.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2>Новости</h2>
            <p>Последние события нашего прихода</p>
            <div className="accent-line" />
          </div>
          <div className="news-grid">
            {news.slice(0, 6).map(n => (
              <div key={n.id} className={`news-card ${n.isFeatured ? 'featured' : ''}`}>
                {n.isFeatured && <span className="badge">Важное</span>}
                <div className="content">
                  <h3>{n.title}</h3>
                  <p>{n.summary}</p>
                  <div className="date">{new Date(n.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/news" className="btn btn-primary">Все новости</Link>
          </p>
        </div>
      )}

      {/* DONATIONS CTA */}
      <div style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-soft))', padding: '48px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--dark)', fontSize: '1.5rem', fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          Поддержите храм
        </h2>
        <p style={{ color: 'rgba(18,19,20,.7)', maxWidth: 500, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Ваша помощь необходима для содержания храма и развития детского центра «Невский»
        </p>
        <Link to="/donations" className="btn" style={{ marginTop: 24, background: 'var(--dark)', color: 'var(--white)', padding: '14px 32px' }}>
          Пожертвовать
        </Link>
      </div>
    </div>
  );
}
