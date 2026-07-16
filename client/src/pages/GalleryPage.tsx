import { useEffect, useState } from 'react';
import { getPhotos, getVideos } from '../api/client';
import type { Photo, Video } from '../api/types';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');

  useEffect(() => {
    getPhotos().then(setPhotos).catch(() => {});
    getVideos().then(setVideos).catch(() => {});
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--primary-dark)', marginBottom: 20 }}>Галерея</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          className={`btn ${tab === 'photos' ? 'btn-primary' : ''}`}
          onClick={() => setTab('photos')}
        >
          Фотографии ({photos.length})
        </button>
        <button
          className={`btn ${tab === 'videos' ? 'btn-primary' : ''}`}
          onClick={() => setTab('videos')}
        >
          Видео ({videos.length})
        </button>
      </div>

      {tab === 'photos' && (
        <div>
          {photos.length === 0 ? (
            <div className="card"><p>Фотографий пока нет. Фото можно добавить через админ-панель.</p></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
              {photos.map(p => (
                <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src={p.url} alt={p.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                  <div style={{ padding: 12 }}>
                    <strong>{p.title}</strong>
                    {p.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: 4 }}>{p.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="card" style={{ marginTop: 20, textAlign: 'center', padding: 32, background: '#f9f7f4' }}>
            <p style={{ fontSize: '1.05rem' }}>
              Фотографии и видео храма Александра Невского в Зубчаниновке можно также найти на сайте
              {' '}<a href="http://temples.ru/card.php?ID=21387" target="_blank" rel="noopener noreferrer">temples.ru</a>
            </p>
          </div>
        </div>
      )}

      {tab === 'videos' && (
        <div>
          {videos.length === 0 ? (
            <div className="card">
              <p>Видео пока нет. Видео можно добавить через админ-панель.</p>
              <p style={{ marginTop: 12 }}>
                Рекомендуемые ресурсы:
              </p>
              <ul>
                <li><a href="https://vk.com/club217831518" target="_blank" rel="noopener noreferrer">Группа ВКонтакте филиала «Невский»</a></li>
                <li><a href="https://www.youtube.com/channel/UCLbUl3m9CcLZf8NTJZ8W5yQ/videos" target="_blank" rel="noopener noreferrer">YouTube канал НФ «ДЕОЦ»</a></li>
              </ul>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
              {videos.map(v => (
                <div key={v.id} className="card" style={{ padding: 0 }}>
                  <iframe
                    src={v.videoUrl}
                    title={v.title}
                    style={{ width: '100%', height: 240, border: 'none' }}
                    allowFullScreen
                  />
                  <div style={{ padding: 12 }}>
                    <strong>{v.title}</strong>
                    {v.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: 4 }}>{v.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
