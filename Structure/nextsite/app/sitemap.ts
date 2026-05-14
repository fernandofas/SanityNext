import { MetadataRoute } from 'next';
import { sanityClient } from '../lib/sanity';
import { webSettingsQuery } from '../sanity/queries';

const allSlugsQuery = `{
  "pages": *[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "posts": *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, slugData] = await Promise.all([
    sanityClient.fetch(webSettingsQuery).catch(() => null),
    sanityClient.fetch(allSlugsQuery).catch(() => ({ pages: [], posts: [] })),
  ]);

  const baseUrl = (settings?.siteUrl || settings?.canonicalBase || 'https://example.com').replace(/\/$/, '');

  const pageEntries: MetadataRoute.Sitemap = (slugData.pages || []).map((p: any) => ({
    url: p.slug === 'home' ? baseUrl + '/' : `${baseUrl}/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : undefined,
    changeFrequency: 'weekly',
    priority: p.slug === 'home' ? 1.0 : 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = (slugData.posts || []).map((p: any) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : undefined,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...pageEntries, ...postEntries];
}
