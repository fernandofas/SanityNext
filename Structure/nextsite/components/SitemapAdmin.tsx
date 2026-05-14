'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { sanityClient } from '../lib/sanity';
import { allPagesQuery, allBlogSlugQuery } from '../sanity/queries';

export default function SitemapAdmin() {
  const [pages, setPages] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      sanityClient.fetch(allPagesQuery),
      sanityClient.fetch(allBlogSlugQuery),
    ]).then(([p, b]) => {
      setPages(p || []);
      setBlogs(b || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="padcont padtop padbot">Loading sitemap…</div>;

  return (
    <div className="padcont padtop padbot">
      <h1 className="mb-6">Sitemap Admin</h1>

      <h2 className="mb-3">Pages ({pages.length})</h2>
      <ul className="nobullet space-y-1 mb-8">
        {pages.map((p: any) => (
          <li key={p.slug?.current}>
            <Link href={`/${p.slug?.current}`} className="editorlink">
              /{p.slug?.current} — {p.title}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mb-3">Blog posts ({blogs.length})</h2>
      <ul className="nobullet space-y-1">
        {blogs.map((b: any) => (
          <li key={b.slug}>
            <Link href={`/blog/${b.slug}`} className="editorlink">
              /blog/{b.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
