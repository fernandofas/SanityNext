'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { authorBySlugQuery, blogListQuery, blogSearchQuery } from '../../sanity/queries';
import { sanityClient, urlFor } from '../../lib/sanity';
import BlogSearch from '../../components/BlogSearch';

export default function BlogListPage() {
  return (
    <Suspense fallback={<div className="padcont padtop padbot"><p>Loading…</p></div>}>
      <BlogListInner />
    </Suspense>
  );
}

function BlogListInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialAuthor = searchParams.get('author') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialDate = searchParams.get('date') || '';

  const [posts, setPosts] = useState<any[]>([]);
  const [authorInfo, setAuthorInfo] = useState<any | null>(null);

  useEffect(() => {
    const hasFilters = !!(initialQuery || initialAuthor || initialCategory || initialDate);
    if (hasFilters) {
      let from: string | null = null;
      let to: string | null = null;
      if (initialDate) {
        const [yy, mm] = initialDate.split('-').map((v) => parseInt(v, 10));
        if (!Number.isNaN(yy) && !Number.isNaN(mm)) {
          from = new Date(Date.UTC(yy, mm - 1, 1)).toISOString();
          to = new Date(Date.UTC(yy, mm, 1)).toISOString();
        }
      }
      sanityClient
        .fetch(blogSearchQuery, {
          q: initialQuery ? `*${initialQuery}*` : null,
          author: initialAuthor || null,
          category: initialCategory || null,
          from,
          to,
        })
        .then(setPosts);

      if (initialAuthor) {
        sanityClient.fetch(authorBySlugQuery, { slug: initialAuthor }).then(setAuthorInfo);
      } else {
        setAuthorInfo(null);
      }
    } else {
      sanityClient.fetch(blogListQuery).then(setPosts);
      setAuthorInfo(null);
    }
  }, [initialQuery, initialAuthor, initialCategory, initialDate]);

  return (
    <div className="padcont mx-auto padtop padbot">
      <div className="flex items-center justify-between mb-6 padrig padlef">
        <h1>News</h1>
        <Link href="/blog/directory" className="editorlink">Browse Authors &amp; Categories</Link>
      </div>

      <BlogSearch
        initialQuery={initialQuery}
        initialAuthor={initialAuthor}
        initialCategory={initialCategory}
        initialDate={initialDate}
        onResults={setPosts}
      />

      {authorInfo && (
        <div className="containerover bradious p-4 mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
          <p className="font-semibold">Posts by: {authorInfo.name}</p>
          {authorInfo.bio && <p className="text-sm opacity-70 mt-1">{authorInfo.bio}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 padlef padrig">
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug?.current}`}
            className="bradious containerover block bart"
            style={{ overflow: 'hidden' }}
          >
            {post.coverImage?.asset?.url && (
              <img
                src={post.coverImage.asset.url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="mb-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>{post.title}</h3>
              {post.excerpt && <p className="text-sm opacity-90 mb-2 line-clamp-3">{post.excerpt}</p>}
              <div className="flex flex-wrap gap-2 mt-3 text-xs opacity-80">
                {post.author?.name && <span>By {post.author.name}</span>}
                {post.publishedAt && (
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                )}
              </div>
              {post.categories?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.categories.map((cat: any) => (
                    <span
                      key={cat.title}
                      className="text-xs py-0.5 bradious"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="padlef padrig opacity-70">No posts found.</p>
      )}
    </div>
  );
}
