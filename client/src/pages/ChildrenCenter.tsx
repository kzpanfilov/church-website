import PageView from './PageView';

const ACHIEVEMENTS = [
  { icon: '&#127942;', title: '1 место', desc: 'Региональный этап Национального чемпионата «Абилимпикс» по гончарному делу' },
  { icon: '&#127932;', title: '«Хоровая весна»', desc: 'Открытый конкурс вокально-хоровых коллективов — региональный уровень' },
  { icon: '&#128218;', title: '«Духовный компас»', desc: 'Открытый региональный конкурс духовно-просветительских проектов' },
  { icon: '&#127941;', title: '«За нравственный подвиг учителя»', desc: 'XXI ежегодный Всероссийский конкурс — региональный этап' },
  { icon: '&#127926;', title: '«Кирилл и Мефодий»', desc: 'XIV Международный хоровой конкурс — награждение победителей' },
  { icon: '&#10084;', title: 'Грант «Движение сердца»', desc: 'Грантовый проект: хореография, психолого-педагогические консультации' },
];

export default function ChildrenCenter() {
  return (
    <div>
      <PageView slug="children-center" />

      {/* Achievements */}
      <div className="section" style={{ marginTop: 48 }}>
        <div className="section-header">
          <h2>Наши достижения</h2>
          <p>Учебный филиал «Невский» — активный участник региональных и всероссийских конкурсов</p>
          <div className="accent-line" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0, width: 48, textAlign: 'center' }}
                dangerouslySetInnerHTML={{ __html: a.icon }} />
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{a.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="section--dark">
        <div className="section__inner">
          <div className="section-header">
            <h2>Наша команда</h2>
            <div className="accent-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1 }}>
            <div className="card" style={{ background: 'var(--dark-card)', border: 'none' }}>
              <div style={{ color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
                Священник-куратор
              </div>
              <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', marginBottom: 8 }}>
                Протоиерей Владимир Болдырев
              </h3>
              <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Настоятель храма с 1993 года.<br />
                Выпускник Самарской Православной Духовной Семинарии.<br />
                Иерейская хиротония: 12.12.1993.<br />
                Священник-куратор НФ «ДЕОЦ» УФ «Невский».
              </p>
              <p style={{ marginTop: 12 }}>
                <a href="tel:+79022927136" style={{ color: 'var(--gold-soft)', fontSize: '0.9rem' }}>
                  +7 (902) 292-71-36
                </a>
              </p>
            </div>
            <div className="card" style={{ background: 'var(--dark-card)', border: 'none' }}>
              <div style={{ color: 'var(--gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
                Руководитель
              </div>
              <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', marginBottom: 8 }}>
                Шубина Марина Николаевна
              </h3>
              <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Педагогический стаж 27 лет.<br />
                В НФ «ДЕОЦ» работает 7 лет.<br />
                Образование: СамГУ, повышение квалификации по основам православной культуры.<br />
                Руководитель НФ «ДЕОЦ», УФ «Невский» г.о. Самара.
              </p>
              <p style={{ marginTop: 12 }}>
                <a href="tel:+79277594991" style={{ color: 'var(--gold-soft)', fontSize: '0.9rem' }}>
                  +7 (927) 759-49-91
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 0, border: '2px solid var(--gold)', padding: 32, textAlign: 'center', background: 'var(--bg)' }}>
        <h3 style={{ color: 'var(--gold)', marginBottom: 12 }}>&#127912; Набор в ГКП-группу</h3>
        <p style={{ fontSize: '1.05rem', marginBottom: 16 }}>
          Открыт набор детей от 3 до 7 лет в группу кратковременного пребывания
        </p>
        <p style={{ marginBottom: 8 }}>
          <strong>Телефон для записи:</strong>{' '}
          <a href="tel:+79277594991" style={{ fontSize: '1.1rem' }}>+7 (927) 759-49-91</a>
        </p>
        <a
          href="https://деоц.рф/filialy/23-filialy/174-uchebnyj-filial-nevskij"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
          style={{ marginTop: 8, padding: '12px 32px', fontSize: '1rem' }}
        >
          Перейти на сайт ДЕОЦ &rarr;
        </a>
      </div>
    </div>
  );
}
