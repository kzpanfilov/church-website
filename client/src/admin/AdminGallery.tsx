import { useEffect, useState } from 'react';
import { getPhotos, getVideos, createPhoto, deletePhoto, createVideo, deleteVideo } from '../api/client';
import type { Photo, Video } from '../api/types';

export default function AdminGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');
  const [photoForm, setPhotoForm] = useState({ title: '', url: '', thumbnailUrl: '', description: '', category: '', sortOrder: 0 });
  const [videoForm, setVideoForm] = useState({ title: '', videoUrl: '', thumbnailUrl: '', description: '', category: '', sortOrder: 0 });

  const load = () => {
    getPhotos().then(setPhotos).catch(() => {});
    getVideos().then(setVideos).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPhoto(photoForm);
    setPhotoForm({ title: '', url: '', thumbnailUrl: '', description: '', category: '', sortOrder: 0 });
    load();
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    await createVideo(videoForm);
    setVideoForm({ title: '', videoUrl: '', thumbnailUrl: '', description: '', category: '', sortOrder: 0 });
    load();
  };

  return (
    <div>
      <h2>Управление галереей</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button className={`btn ${tab === 'photos' ? 'btn-primary' : ''}`} onClick={() => setTab('photos')}>Фото</button>
        <button className={`btn ${tab === 'videos' ? 'btn-primary' : ''}`} onClick={() => setTab('videos')}>Видео</button>
      </div>

      {tab === 'photos' && (
        <div>
          <form onSubmit={handleAddPhoto} className="card" style={{ marginBottom: 20 }}>
            <h3>Добавить фото</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Название</label>
                <input value={photoForm.title} onChange={e => setPhotoForm({ ...photoForm, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>URL изображения</label>
                <input value={photoForm.url} onChange={e => setPhotoForm({ ...photoForm, url: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Описание</label>
                <input value={photoForm.description || ''} onChange={e => setPhotoForm({ ...photoForm, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Категория</label>
                <input value={photoForm.category || ''} onChange={e => setPhotoForm({ ...photoForm, category: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Добавить</button>
          </form>

          <table className="admin-table">
            <thead><tr><th>Название</th><th>Категория</th><th>Действия</th></tr></thead>
            <tbody>
              {photos.map(p => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.category || '—'}</td>
                  <td><button className="btn btn-danger" onClick={() => { if (confirm('Удалить?')) deletePhoto(p.id).then(load); }}>Удал.</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'videos' && (
        <div>
          <form onSubmit={handleAddVideo} className="card" style={{ marginBottom: 20 }}>
            <h3>Добавить видео</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Название</label>
                <input value={videoForm.title} onChange={e => setVideoForm({ ...videoForm, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>URL видео (YouTube embed)</label>
                <input value={videoForm.videoUrl} onChange={e => setVideoForm({ ...videoForm, videoUrl: e.target.value })} required placeholder="https://www.youtube.com/embed/..." />
              </div>
            </div>
            <div className="form-group">
              <label>Описание</label>
              <input value={videoForm.description || ''} onChange={e => setVideoForm({ ...videoForm, description: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary">Добавить</button>
          </form>

          <table className="admin-table">
            <thead><tr><th>Название</th><th>URL</th><th>Действия</th></tr></thead>
            <tbody>
              {videos.map(v => (
                <tr key={v.id}>
                  <td>{v.title}</td>
                  <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.videoUrl}</td>
                  <td><button className="btn btn-danger" onClick={() => { if (confirm('Удалить?')) deleteVideo(v.id).then(load); }}>Удал.</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
