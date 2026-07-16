import { useEffect, useState } from 'react';
import { getNews } from '../api/client';
import type { NewsItem } from '../api/types';

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    getNews(50).then(setNews).catch(() => {});
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--primary-dark)', marginBottom: 20 }}>Новости храма</h2>
      {news.length === 0 ? (
        <div className="card"><p>Новостей пока нет.</p></div>
      ) : (
        <div className="news-grid">
          {news.map(n => (
            <div key={n.id} className={`news-card ${n.isFeatured ? 'featured' : ''}`}>
              {n.isFeatured && <span className="badge">Важное</span>}
              {n.imageUrl && <img src={n.imageUrl} alt={n.title} />}
              <div className="content">
                <h3>{n.title}</h3>
                <p>{n.summary}</p>
                <div className="date">{new Date(n.publishedAt).toLocaleDateString('ru-RU')}</div>
                <div style={{ marginTop: 8 }} dangerouslySetInnerHTML={{ __html: n.content }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
