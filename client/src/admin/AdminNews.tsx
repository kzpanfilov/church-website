import { useEffect, useState } from 'react';
import { getAllNews, createNews, updateNews, deleteNews } from '../api/client';
import type { NewsItem } from '../api/types';

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState({
    title: '', summary: '', content: '', imageUrl: '', isPublished: true, isFeatured: false,
    publishedAt: new Date().toISOString().split('T')[0]
  });

  const load = () => getAllNews().then(setNews).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...form, publishedAt: new Date(form.publishedAt).toISOString() };
      if (editing) {
        await updateNews(editing.id, data);
      } else {
        await createNews(data);
      }
      setEditing(null);
      setForm({ title: '', summary: '', content: '', imageUrl: '', isPublished: true, isFeatured: false, publishedAt: new Date().toISOString().split('T')[0] });
      load();
    } catch {
      alert('Ошибка сохранения');
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditing(item);
    setForm({
      title: item.title, summary: item.summary, content: item.content,
      imageUrl: item.imageUrl || '', isPublished: item.isPublished, isFeatured: item.isFeatured,
      publishedAt: item.publishedAt.split('T')[0]
    });
  };

  return (
    <div>
      <h2>Управление новостями</h2>
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 24 }}>
        <h3>{editing ? 'Редактирование новости' : 'Новая новость'}</h3>
        <div className="form-group">
          <label>Заголовок</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Краткое описание</label>
          <textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} style={{ minHeight: 60 }} required />
        </div>
        <div className="form-group">
          <label>Содержимое (HTML)</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} style={{ minHeight: 150 }} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div className="form-group">
            <label>URL изображения</label>
            <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Дата публикации</label>
            <input type="date" value={form.publishedAt} onChange={e => setForm({ ...form, publishedAt: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'end', paddingBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
              Опубликовано
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
              Важное
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">{editing ? 'Сохранить' : 'Создать'}</button>
          {editing && <button type="button" className="btn" style={{ marginLeft: 8 }} onClick={() => setEditing(null)}>Отмена</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr><th>Заголовок</th><th>Дата</th><th>Важное</th><th>Статус</th><th>Действия</th></tr>
        </thead>
        <tbody>
          {news.map(n => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{new Date(n.publishedAt).toLocaleDateString('ru-RU')}</td>
              <td>{n.isFeatured ? '⭐' : ''}</td>
              <td>{n.isPublished ? '✅' : '❌'}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(n)} style={{ marginRight: 8 }}>Ред.</button>
                <button className="btn btn-danger" onClick={() => { if (confirm('Удалить?')) { deleteNews(n.id).then(load); } }}>Удал.</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
