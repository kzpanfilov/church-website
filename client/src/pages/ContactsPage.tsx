import { useEffect, useState } from 'react';
import { getPageBySlug } from '../api/client';
import type { Page } from '../api/types';

export default function ContactsPage() {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    getPageBySlug('contacts').then(setPage).catch(() => {});
  }, []);

  return (
    <div>
      {page && (
        <div className="page-content">
          <h2>{page.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <div className="section-header">
          <h2>Мы на карте</h2>
          <div className="accent-line" />
        </div>
        <div style={{ borderRadius: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=50.33721%2C53.25411&z=16&pt=50.33721%2C53.25411%2Cpm2rdm&lang=ru_RU"
            width="100%"
            height="450"
            frameBorder="0"
            allowFullScreen
            style={{ display: 'block' }}
            title="Храм Александра Невского на карте"
          />
        </div>
        <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          г. Самара, пос. Зубчаниновка, ул. Транзитная, 111А
        </p>
      </div>
    </div>
  );
}
