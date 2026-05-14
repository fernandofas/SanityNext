import { NextResponse } from 'next/server';
import { sanityClient } from '../../lib/sanity';
import { webSettingsQuery } from '../../sanity/queries';

const llmsDataQuery = `{
  "settings": *[_type == "webSettings"][0]{ siteName, metaDescription, siteUrl },
  "pages": *[_type == "page" && defined(slug.current)] | order(title asc){
    title,
    "slug": slug.current,
    metaDescription
  },
  "posts": *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
    title,
    "slug": slug.current,
    excerpt,
    publishedAt
  }
}`;

export async function GET() {
  const data = await sanityClient.fetch(llmsDataQuery).catch(() => null);

  const settings = data?.settings;
  const baseUrl = (settings?.siteUrl || 'https://example.com').replace(/\/$/, '');
  const siteName = settings?.siteName || 'SanityNext';
  const siteDesc = settings?.metaDescription || '';

  const lines: string[] = [];

  lines.push(`# ${siteName}`);
  lines.push('');
  if (siteDesc) {
    lines.push(`> ${siteDesc}`);
    lines.push('');
  }

  lines.push('## Pages');
  lines.push('');
  for (const page of data?.pages || []) {
    const url = page.slug === 'home' ? baseUrl + '/' : `${baseUrl}/${page.slug}`;
    lines.push(`- [${page.title}](${url})${page.metaDescription ? ': ' + page.metaDescription : ''}`);
  }
  lines.push('');

  lines.push('## Blog Posts');
  lines.push('');
  for (const post of data?.posts || []) {
    const url = `${baseUrl}/blog/${post.slug}`;
    const date = post.publishedAt ? ` (${post.publishedAt.slice(0, 10)})` : '';
    lines.push(`- [${post.title}](${url})${date}${post.excerpt ? ': ' + post.excerpt : ''}`);
  }

  const text = lines.join('\n');

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
