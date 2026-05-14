/**
 * JSON-LD structured data components for AEO (Answer Engine Optimization).
 * Usage: <JsonLd data={...} /> or use the named helpers below.
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Organization schema (for layout/global)
// ---------------------------------------------------------------------------
export function OrganizationJsonLd({
  name,
  url,
  logo,
  description,
}: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        ...(logo ? { logo } : {}),
        ...(description ? { description } : {}),
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// WebSite with sitelinks search (for home page)
// ---------------------------------------------------------------------------
export function WebSiteJsonLd({ name, url }: { name: string; url: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${url}/blog?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Article schema (for blog posts)
// ---------------------------------------------------------------------------
export function ArticleJsonLd({
  title,
  url,
  description,
  publishedAt,
  authorName,
  image,
  siteName,
}: {
  title: string;
  url: string;
  description?: string;
  publishedAt?: string;
  authorName?: string;
  image?: string;
  siteName?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        url,
        ...(description ? { description } : {}),
        ...(publishedAt ? { datePublished: publishedAt } : {}),
        ...(image ? { image } : {}),
        ...(siteName ? { publisher: { '@type': 'Organization', name: siteName } } : {}),
        ...(authorName
          ? { author: { '@type': 'Person', name: authorName } }
          : {}),
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// BreadcrumbList schema
// ---------------------------------------------------------------------------
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// FAQPage schema (for accordion blocks)
// ---------------------------------------------------------------------------
export function FaqJsonLd({
  items,
}: {
  items: { title: string; content: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.title,
          acceptedAnswer: { '@type': 'Answer', text: item.content },
        })),
      }}
    />
  );
}
