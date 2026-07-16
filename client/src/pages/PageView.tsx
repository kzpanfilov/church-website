import { useEffect, useState } from 'react';
import { getPageBySlug } from '../api/client';
import type { Page } from '../api/types';

export default function PageView({ slug }: { slug: string }) {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    getPageBySlug(slug).then(setPage).catch(() => {});
  }, [slug]);

  if (!page) return <div className="card"><p>Загрузка...</p></div>;

  return (
    <div className="page-content">
      <h2>{page.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
