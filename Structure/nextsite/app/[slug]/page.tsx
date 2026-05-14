import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '../../lib/sanity';
import { allPageSlugsQuery, pageBySlugQuery, webSettingsQuery } from '../../sanity/queries';
import PageRenderer from '../../components/PageRenderer';
import { buildMetadata } from '../../lib/seo';

export const revalidate = false; // fully static

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(allPageSlugsQuery);
  return slugs
    .filter((s) => s.slug && s.slug !== 'home')
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [page, settings] = await Promise.all([
    sanityClient.fetch(pageBySlugQuery, { slug }).catch(() => null),
    sanityClient.fetch(webSettingsQuery).catch(() => null),
  ]);
  if (!page) return {};
  return buildMetadata({ page, settings });
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await sanityClient.fetch(pageBySlugQuery, { slug });
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
