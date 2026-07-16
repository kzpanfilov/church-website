import { useEffect, useState } from 'react';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../api/client';
import type { Announcement } from '../api/types';

export default function AdminAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [form, setForm] = useState({ title: '', content: '', linkUrl: '', linkText: '', isActive: true, sortOrder: 0 });

  const load = () => getAnnouncements().then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAnnouncement(form);
    setForm({ title: '', content: '', linkUrl: '', linkText: '', isActive: true, sortOrder: 0 });
    load();
  };

  return (
    <div>
      <h2>Управление объявлениями</h2>
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 24 }}>
        <h3>Новое объявление</h3>
        <div className="form-group">
          <label>Заголовок</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Текст</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label>Ссылка (URL)</label>
            <input value={form.linkUrl} onChange={e => setForm({ ...form, linkUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Текст ссылки</label>
            <input value={form.linkText} onChange={e => setForm({ ...form, linkText: e.target.value })} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'end' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
            Активно
          </label>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </div>
      </form>

      <table className="admin-table">
        <thead><tr><th>Заголовок</th><th>Ссылка</th><th>Активно</th><th>Действия</th></tr></thead>
        <tbody>
          {items.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.linkUrl ? <a href={a.linkUrl} target="_blank" rel="noopener noreferrer">{a.linkText || a.linkUrl}</a> : '—'}</td>
              <td>{a.isActive ? '✅' : '❌'}</td>
              <td><button className="btn btn-danger" onClick={() => { if (confirm('Удалить?')) deleteAnnouncement(a.id).then(load); }}>Удал.</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
