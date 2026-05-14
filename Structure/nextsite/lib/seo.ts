/**
 * Central SEO helper — builds Next.js Metadata objects from Sanity data.
 *
 * Usage:
 *   import { buildMetadata } from '../../lib/seo';
 *   export async function generateMetadata() {
 *     const settings = await fetchWebSettings();
 *     const page = await fetchPage(slug);
 *     return buildMetadata({ page, settings });
 *   }
 */

import type { Metadata } from 'next';

interface SeoImage {
  asset?: { url?: string };
  alt?: string;
  width?: number;
  height?: number;
}

interface PageSeo {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: SeoImage;
  slug?: { current?: string };
  publishedAt?: string;
}

interface WebSettings {
  siteName?: string;
  siteUrl?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalBase?: string;
  favicon?: { asset?: { url?: string } };
  appleTouchIcon?: { asset?: { url?: string } };
  ogLocale?: string;
  ogType?: string;
  ogImage?: SeoImage;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
}

function ogImageEntry(img: SeoImage | undefined): { url: string; width?: number; height?: number; alt?: string }[] {
  if (!img?.asset?.url) return [];
  return [{
    url: img.asset.url,
    width: img.width ?? 1200,
    height: img.height ?? 630,
    alt: img.alt ?? '',
  }];
}

export function buildMetadata({
  page,
  settings,
  type = 'website',
  isBlogPost = false,
}: {
  page?: PageSeo | null;
  settings?: WebSettings | null;
  type?: string;
  isBlogPost?: boolean;
}): Metadata {
  const siteName = settings?.siteName || 'SanityNext';
  const baseUrl = settings?.siteUrl || settings?.canonicalBase || '';

  // Titles
  const rawTitle = page?.metaTitle || page?.title;
  const title = rawTitle ? `${rawTitle} | ${siteName}` : siteName;

  // Description — page overrides global
  const description = page?.metaDescription || settings?.metaDescription || undefined;

  // Keywords — merge page + global
  const pageKw = page?.keywords || '';
  const globalKw = settings?.keywords || '';
  const keywords = [pageKw, globalKw].filter(Boolean).join(', ') || undefined;

  // Canonical
  const canonical = page?.canonicalUrl
    || (baseUrl && page?.slug?.current
        ? `${baseUrl.replace(/\/$/, '')}/${page.slug.current}`
        : undefined);

  // OG image — page overrides global
  const ogImg = ogImageEntry(page?.ogImage?.asset?.url ? page.ogImage : settings?.ogImage);

  // Robots
  const robots = page?.noIndex ? { index: false, follow: true } : undefined;

  // Icons
  const icons: Metadata['icons'] = {};
  if (settings?.favicon?.asset?.url) {
    icons.icon = settings.favicon.asset.url;
  }
  if (settings?.appleTouchIcon?.asset?.url) {
    icons.apple = settings.appleTouchIcon.asset.url;
  }

  const metadata: Metadata = {
    title,
    description,
    keywords,
    ...(robots ? { robots } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(Object.keys(icons).length ? { icons } : {}),
    openGraph: {
      title: rawTitle || siteName,
      description,
      siteName,
      locale: settings?.ogLocale || 'en_US',
      type: (isBlogPost ? 'article' : (settings?.ogType as any)) || 'website',
      ...(ogImg.length ? { images: ogImg } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(isBlogPost && page?.publishedAt ? { publishedTime: page.publishedAt } : {}),
    },
    twitter: {
      card: settings?.twitterCard || 'summary_large_image',
      title: rawTitle || siteName,
      description,
      ...(settings?.twitterSite ? { site: settings.twitterSite } : {}),
      ...(settings?.twitterCreator ? { creator: settings.twitterCreator } : {}),
      ...(ogImg.length ? { images: [ogImg[0].url] } : {}),
    },
  };

  return metadata;
}
