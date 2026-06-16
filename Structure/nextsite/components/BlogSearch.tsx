'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogSearchQuery, authorBySlugQuery, blogSearchStyleQuery, allAuthorsQuery, allCategoriesQuery } from '../sanity/queries';
import { sanityClient } from '../lib/sanity';

// Helper to convert Sanity color to rgba string
function toRgba(c: any): string | undefined {
  if (!c?.rgb) return undefined;
  const { r, g, b } = c.rgb;
  const a = c.alpha ?? 1;
  return `rgba(${r},${g},${b},${a})`;
}

interface BlogSearchProps {
  initialQuery?: string;
  initialAuthor?: string;
  initialCategory?: string;
  initialDate?: string;
  onResults: (posts: any[]) => void;
}

export default function BlogSearch({
  initialQuery = '',
  initialAuthor = '',
  initialCategory = '',
  initialDate = '',
  onResults,
}: BlogSearchProps) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const [author, setAuthor] = useState(initialAuthor);
  const [category, setCategory] = useState(initialCategory);
  const [date, setDate] = useState(initialDate);
  const [searchStyle, setSearchStyle] = useState<any>(null);
  const [authors, setAuthors] = useState<{ name: string; slug: { current: string } }[]>([]);
  const [categories, setCategories] = useState<{ title: string; slug: { current: string } }[]>([]);

  useEffect(() => {
    sanityClient.fetch(blogSearchStyleQuery).then((s: any) => setSearchStyle(s)).catch(() => {});
    sanityClient.fetch(allAuthorsQuery).then((a: any[]) => setAuthors(a || [])).catch(() => {});
    sanityClient.fetch(allCategoriesQuery).then((c: any[]) => setCategories(c || [])).catch(() => {});
  }, []);

  const runSearch = async (qv: string, av: string, cv: string, dv: string) => {
    let from: string | null = null;
    let to: string | null = null;
    if (dv) {
      const [yy, mm] = dv.split('-').map((v) => parseInt(v, 10));
      if (!Number.isNaN(yy) && !Number.isNaN(mm)) {
        from = new Date(Date.UTC(yy, mm - 1, 1)).toISOString();
        to = new Date(Date.UTC(yy, mm, 1)).toISOString();
      }
    }
    const results = await sanityClient.fetch(blogSearchQuery, {
      q: qv ? `*${qv}*` : null,
      author: av || null,
      category: cv || null,
      from,
      to,
    });
    onResults(results);

    const params = new URLSearchParams();
    if (qv) params.set('q', qv);
    if (av) params.set('author', av);
    if (cv) params.set('category', cv);
    if (dv) params.set('date', dv);
    const qs = params.toString();
    router.replace(`/blog${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(q, author, category, date);
  };

  const handleClear = () => {
    setQ('');
    setAuthor('');
    setCategory('');
    setDate('');
    router.replace('/blog', { scroll: false });
  };

  const ss = searchStyle;

  const wrapperStyle: React.CSSProperties = {
    backgroundColor: toRgba(ss?.wrapperBackgroundColor) ?? undefined,
    padding: ss ? `${ss.wrapperPaddingY ?? 0}px ${ss.wrapperPaddingX ?? 0}px` : undefined,
    borderRadius: ss?.wrapperBorderRadius != null ? `${ss.wrapperBorderRadius}px` : undefined,
    gap: ss?.gap != null ? `${ss.gap}px` : undefined,
  };

  const labelStyle: React.CSSProperties = {
    color: toRgba(ss?.labelColor) ?? undefined,
    fontSize: ss?.labelFontSize != null ? `${ss.labelFontSize}px` : undefined,
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: toRgba(ss?.inputBackgroundColor) ?? undefined,
    color: toRgba(ss?.inputTextColor) ?? undefined,
    borderColor: toRgba(ss?.inputBorderColor) ?? undefined,
    borderWidth: ss?.inputBorderWidth != null ? `${ss.inputBorderWidth}px` : undefined,
    borderRadius: ss?.inputBorderRadius != null ? `${ss.inputBorderRadius}px` : undefined,
    padding: ss ? `${ss.inputPaddingY ?? 6}px ${ss.inputPaddingX ?? 10}px` : undefined,
  };

  const searchBtnStyle: React.CSSProperties = {
    backgroundColor: toRgba(ss?.searchBtnBackgroundColor) ?? '#c3c3c3',
    color: toRgba(ss?.searchBtnTextColor) ?? '#535353',
    borderColor: toRgba(ss?.searchBtnBorderColor) ?? undefined,
    borderWidth: ss?.searchBtnBorderWidth != null ? `${ss.searchBtnBorderWidth}px` : undefined,
    borderRadius: ss?.searchBtnBorderRadius != null ? `${ss.searchBtnBorderRadius}px` : '5px',
    padding: `${ss?.searchBtnPaddingY ?? 8}px ${ss?.searchBtnPaddingX ?? 20}px`,
    fontSize: ss?.searchBtnFontSize != null ? `${ss.searchBtnFontSize}px` : undefined,
    cursor: 'pointer',
  };

  const clearBtnStyle: React.CSSProperties = {
    color: toRgba(ss?.clearBtnTextColor) ?? undefined,
    fontSize: ss?.clearBtnFontSize != null ? `${ss.clearBtnFontSize}px` : undefined,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 padlef padrig flex flex-wrap items-end"
      style={wrapperStyle}
    >
      <div className="flex flex-col gap-1">
        <label className="opacity-70" style={labelStyle}>Search</label>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Keyword…"
          className="forminputpad bradious border focus:outline-none"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="opacity-70" style={labelStyle}>Author</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="forminputpad bradious border focus:outline-none"
          style={inputStyle}
        >
          <option value="">All authors</option>
          {authors.map((a) => (
            <option key={a.slug?.current} value={a.slug?.current}>{a.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="opacity-70" style={labelStyle}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="forminputpad bradious border focus:outline-none"
          style={inputStyle}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug?.current} value={c.slug?.current}>{c.title}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="opacity-70" style={labelStyle}>Month (YYYY-MM)</label>
        <input
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="forminputpad bradious border focus:outline-none"
          style={inputStyle}
        />
      </div>

      <button type="submit" style={searchBtnStyle}>
        {ss?.searchBtnLabel ?? 'Search'}
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="opacity-80 hover:opacity-100"
        style={clearBtnStyle}
      >
        {ss?.clearBtnLabel ?? 'Clear'}
      </button>
    </form>
  );
}
