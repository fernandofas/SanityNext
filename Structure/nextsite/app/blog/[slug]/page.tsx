import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanityClient, urlFor } from '../../../lib/sanity';
import { allBlogSlugQuery, blogPostBySlugQuery, recentBlogPostsQuery, webSettingsQuery } from '../../../sanity/queries';
import BlogPostContent from '../../../components/BlogPostContent';
import { buildMetadata } from '../../../lib/seo';

export const revalidate = false;

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(allBlogSlugQuery);
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    sanityClient.fetch(blogPostBySlugQuery, { slug }).catch(() => null),
    sanityClient.fetch(webSettingsQuery).catch(() => null),
  ]);
  if (!post) return {};
  // Fall back og image to coverImage if no explicit ogImage set
  const pageData = {
    ...post,
    ogImage: post.ogImage?.asset?.url ? post.ogImage : post.coverImage,
  };
  return buildMetadata({ page: pageData, settings, isBlogPost: true });
}

function toRgba(color: any): string | undefined {
  if (!color?.rgb) return undefined;
  const { r, g, b } = color.rgb;
  const a = color.alpha ?? 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, recent] = await Promise.all([
    sanityClient.fetch(blogPostBySlugQuery, { slug }),
    sanityClient.fetch(recentBlogPostsQuery, { excludeSlug: slug }),
  ]);

  if (!post) notFound();

  return (
    <div className="padcont padtop padbot">
      <Link href="/blog" className="editorlink mb-6 inline-block">&larr; Back to News</Link>

      {post.coverImage?.asset?.url && (
        <img
          src={post.coverImage.asset.url}
          alt={post.title}
          className="w-full h-64 object-cover bradious mb-8"
        />
      )}

      <h1 className="mb-4">{post.title}</h1>

      <div className="flex flex-wrap gap-4 mb-8 text-sm opacity-70">
        {post.author?.name && (
          <span>
            By{' '}
            <Link href={`/blog?author=${post.author.slug?.current}`} className="underline">
              {post.author.name}
            </Link>
          </span>
        )}
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )}
        {post.categories?.map((cat: any) => (
          <Link
            key={cat.title}
            href={`/blog?category=${cat.slug?.current}`}
            className="px-2 py-0.5 bradious text-xs"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Column layout & content — rendered client-side so all PTE features work */}
      <BlogPostContent post={post} />

      {/* Recent posts */}
      {recent.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6">More from the blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recent.map((rp: any) => (
              <Link
                key={rp._id}
                href={`/blog/${rp.slug?.current}`}
                className="bradious containerover block"
                style={{ backgroundColor: 'rgba(0,0,0,0.25)', overflow: 'hidden' }}
              >
                {rp.coverImage?.asset?.url && (
                  <img src={rp.coverImage.asset.url} alt={rp.title} className="w-full h-32 object-cover" />
                )}
                <div className="p-3">
                  <p className="font-semibold text-sm">{rp.title}</p>
                  {rp.publishedAt && (
                    <p className="text-xs opacity-60 mt-1">
                      {new Date(rp.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
