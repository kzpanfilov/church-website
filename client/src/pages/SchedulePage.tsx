import { useEffect, useState, useRef } from 'react';
import { getScheduleEvents } from '../api/client';
import type { ChurchEvent } from '../api/types';

const DAY_NAMES = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const SAINTS = [
  { date: '12 декабря', name: 'День памяти святого благоверного князя Александра Невского', type: 'Престольный праздник' },
  { date: '6 декабря', name: 'День памяти святого благоверного великого князя Александра Невского', type: 'Престольный праздник' },
  { date: '23 ноября', name: 'Собор Казанских святых', type: 'Праздник' },
];

export default function SchedulePage() {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getScheduleEvents(50).then(setEvents).catch(() => {});
  }, []);

  const grouped = DAY_NAMES.map((day, idx) => ({
    day,
    events: events.filter(e => e.dayOfWeek === idx),
  })).filter(g => g.events.length > 0);

  const handlePrint = () => window.print();

  return (
    <div>
      <div className="section-header">
        <h2>Расписание богослужений</h2>
        <p>Регулярные богослужения в храме Александра Невского</p>
        <div className="accent-line" />
      </div>

      <div ref={printRef}>
        {grouped.length > 0 ? (
          <div className="schedule-grid" style={{ marginBottom: 1 }}>
            {grouped.map((g) => (
              <div key={g.day} className="schedule-item">
                <div className="schedule-item__day">{g.day}</div>
                {g.events.map(ev => (
                  <p key={ev.id}>
                    <strong>{ev.time || 'По договорённости'}</strong> — {ev.title}
                    {ev.description && <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}> ({ev.description})</span>}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="schedule-grid" style={{ marginBottom: 1 }}>
            <div className="schedule-item">
              <div className="schedule-item__day">Пятница</div>
              <p><strong>17:00</strong> — вечерня</p>
            </div>
            <div className="schedule-item">
              <div className="schedule-item__day">Воскресенье</div>
              <p><strong>9:00</strong> — Божественная литургия</p>
            </div>
            <div className="schedule-item">
              <div className="schedule-item__day">Воскресенье</div>
              <p><strong>17:00</strong> — Акафист Александру Невскому</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 48 }}>
          <div className="section-header">
            <h2>Престольные праздники</h2>
            <div className="accent-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, background: 'var(--border-light)' }}>
            {SAINTS.map((s, i) => (
              <div key={i} className="card">
                <div className="card__label">{s.type}</div>
                <h3>{s.name}</h3>
                <p style={{ marginTop: 8 }}>{s.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, padding: 24, background: 'var(--bg-secondary, var(--bg-warm))', border: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <strong>Внимание!</strong> Расписание может изменяться в праздничные дни.
            Актуальную информацию уточняйте по телефону: <a href="tel:+78469312071">+7 (846) 931-20-71</a>
          </p>
        </div>
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={handlePrint}>
          &#128424; Распечатать расписание
        </button>
      </div>
    </div>
  );
}
