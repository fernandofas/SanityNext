import { Metadata } from 'next';
import { sanityClient } from '../lib/sanity';
import { pageBySlugQuery, webSettingsQuery } from '../sanity/queries';
import PageRenderer from '../components/PageRenderer';
import { buildMetadata } from '../lib/seo';

export const revalidate = false; // fully static

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    sanityClient.fetch(pageBySlugQuery, { slug: 'home' }).catch(() => null),
    sanityClient.fetch(webSettingsQuery).catch(() => null),
  ]);
  return buildMetadata({ page: { ...page, slug: { current: '' } }, settings });
}

export default async function HomePage() {
  const page = await sanityClient.fetch(pageBySlugQuery, { slug: 'home' });
  return <PageRenderer page={page} />;
}
