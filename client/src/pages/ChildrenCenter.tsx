import PageView from './PageView';

export default function ChildrenCenter() {
  return (
    <div>
      <PageView slug="children-center" />
      <div className="card" style={{ marginTop: 20, border: '2px solid var(--gold)', padding: 24, textAlign: 'center' }}>
        <h3 style={{ color: 'var(--gold)', marginBottom: 12 }}>&#127912; Набор в ГКП-группу</h3>
        <p style={{ fontSize: '1.05rem', marginBottom: 16 }}>
          Открыт набор детей от 3 до 7 лет в группу кратковременного пребывания на базе учебного филиала «Невский»
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
