import { useEffect, useState } from 'react';
import { getAllPages, createPage, updatePage, deletePage } from '../api/client';
import type { Page } from '../api/types';

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState({ slug: '', title: '', content: '', metaDescription: '', isPublished: true, sortOrder: 0 });

  const load = () => getAllPages().then(setPages).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updatePage(editing.id, form);
      } else {
        await createPage(form);
      }
      setEditing(null);
      setForm({ slug: '', title: '', content: '', metaDescription: '', isPublished: true, sortOrder: 0 });
      load();
    } catch (err) {
      alert('Ошибка сохранения');
    }
  };

  const handleEdit = (page: Page) => {
    setEditing(page);
    setForm({ slug: page.slug, title: page.title, content: page.content, metaDescription: page.metaDescription || '', isPublished: page.isPublished, sortOrder: page.sortOrder || 0 });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Удалить страницу?')) {
      await deletePage(id);
      load();
    }
  };

  return (
    <div>
      <h2>Управление страницами</h2>
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 24 }}>
        <h3>{editing ? 'Редактирование' : 'Новая страница'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group">
            <label>Slug (URL)</label>
            <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Заголовок</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
        </div>
        <div className="form-group">
          <label>Meta описание</label>
          <input value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Содержимое (HTML)</label>
          <textarea
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            style={{ minHeight: 200 }}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
            Опубликовано
          </label>
          <div className="form-group" style={{ marginBottom: 0, width: 100 }}>
            <label>Порядок</label>
            <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </div>
          <button type="submit" className="btn btn-primary">{editing ? 'Сохранить' : 'Создать'}</button>
          {editing && <button type="button" className="btn" onClick={() => { setEditing(null); setForm({ slug: '', title: '', content: '', metaDescription: '', isPublished: true, sortOrder: 0 }); }}>Отмена</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr><th>Slug</th><th>Заголовок</th><th>Статус</th><th>Действия</th></tr>
        </thead>
        <tbody>
          {pages.map(p => (
            <tr key={p.id}>
              <td>{p.slug}</td>
              <td>{p.title}</td>
              <td>{p.isPublished ? '✅' : '❌'}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(p)} style={{ marginRight: 8 }}>Ред.</button>
                <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Удал.</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
