import { useEffect, useState, useCallback } from 'react';
import { getPhotos, getVideos } from '../api/client';
import type { Photo, Video } from '../api/types';

const GALLERY_PHOTOS = [
  ...Array.from({ length: 9 }, (_, i) => ({
    src: `/images/gallery/yandex-${String(i).padStart(2, '0')}.jpg`,
    id: i,
    label: null as string | null,
  })),
  { src: '/images/gallery/nevskij-priest.jpg', id: 9, label: 'Протоиерей Владимир Болдырев — священник-куратор' },
  { src: '/images/gallery/nevskij-marina.jpg', id: 10, label: 'Шубина Марина Николаевна — руководитель филиала' },
  { src: '/images/gallery/nevskij-building-history.jpg', id: 11, label: 'История строительства центра' },
];

type LightboxItem = { src: string; label?: string | null };

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const allPhotos: LightboxItem[] = [
    ...GALLERY_PHOTOS,
    ...photos.map(p => ({ src: p.url, label: p.title })),
  ];

  useEffect(() => {
    getPhotos().then(setPhotos).catch(() => {});
    getVideos().then(setVideos).catch(() => {});
  }, []);

  const navigateLightbox = useCallback((dir: number) => {
    setLightbox(p => p !== null ? (p + dir + allPhotos.length) % allPhotos.length : null);
  }, [allPhotos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, navigateLightbox]);

  return (
    <div>
      <div className="section-header">
        <h2>Галерея храма</h2>
        <p>Фотографии храма Александра Невского в Зубчаниновке, г. Самара</p>
        <div className="accent-line" />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          className={`btn ${tab === 'photos' ? 'btn-primary' : ''}`}
          onClick={() => setTab('photos')}
        >
          Фотографии ({allPhotos.length})
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 4 }}>
            {GALLERY_PHOTOS.map((p, i) => (
              <div
                key={p.id}
                onClick={() => setLightbox(i)}
                style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
              >
                <img
                  src={p.src}
                  alt={`Храм Александра Невского — фото ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', transition: 'transform .3s' }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {'label' in p && p.label && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,.8))',
                    padding: '24px 10px 8px', color: '#fff', fontSize: '0.78rem',
                  }}>
                    {p.label}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, textAlign: 'center', padding: 24, background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
            <p>
              Фотографии также доступны на{' '}
              <a href="http://temples.ru/card.php?ID=21387" target="_blank" rel="noopener noreferrer">temples.ru</a>
              {' '}и в{' '}
              <a href="https://yandex.ru/maps/org/tserkov_v_chest_blagovernogo_knyazya_aleksandra_nevskogo/1116793597/gallery/" target="_blank" rel="noopener noreferrer">Яндекс.Картах</a>
            </p>
          </div>
        </div>
      )}

      {tab === 'videos' && (
        <div>
          {videos.length === 0 ? (
            <div style={{ padding: 32, background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
              <p>Видео пока нет. Рекомендуемые ресурсы:</p>
              <ul style={{ marginTop: 12 }}>
                <li><a href="https://vk.com/club217831518" target="_blank" rel="noopener noreferrer">Группа ВКонтакте филиала «Невский»</a></li>
                <li><a href="https://www.youtube.com/channel/UCLbUl3m9CcLZf8NTJZ8W5yQ/videos" target="_blank" rel="noopener noreferrer">YouTube канал НФ «ДЕОЦ»</a></li>
              </ul>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
              {videos.map(v => (
                <div key={v.id} style={{ padding: 0 }}>
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

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,.92)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); navigateLightbox(-1); }}
            style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 48, cursor: 'pointer' }}
          >&#8592;</button>
          <img
            src={allPhotos[lightbox].src}
            alt=""
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={e => { e.stopPropagation(); navigateLightbox(1); }}
            style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: 48, cursor: 'pointer' }}
          >&#8594;</button>
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer' }}
          >&#10005;</button>
          <div style={{ position: 'absolute', bottom: 20, color: '#fff', fontSize: 14, textAlign: 'center', left: 0, right: 0 }}>
            {allPhotos[lightbox].label && (
              <div style={{ marginBottom: 4, fontSize: 15 }}>{allPhotos[lightbox].label}</div>
            )}
            {lightbox + 1} / {allPhotos.length}
          </div>
        </div>
      )}
    </div>
  );
}
