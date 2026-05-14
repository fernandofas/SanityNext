import Link from 'next/link';
import { sanityClient, urlFor } from '../../../lib/sanity';
import { allAuthorsQuery, allCategoriesQuery } from '../../../sanity/queries';

export const revalidate = false;

export default async function BlogDirectoryPage() {
  const [authors, categories] = await Promise.all([
    sanityClient.fetch(allAuthorsQuery),
    sanityClient.fetch(allCategoriesQuery),
  ]);

  return (
    <div className="padcont padtop padbot">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/blog" className="editorlink">&larr; Back to News</Link>
        <h1>Browse Authors &amp; Categories</h1>
      </div>

      <section className="mb-10">
        <h2 className="mb-4">Authors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author: any) => (
            <Link
              key={author.slug?.current}
              href={`/blog?author=${author.slug?.current}`}
              className="bradious p-4 flex items-center gap-4 containerover"
              style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
            >
              {author.image?.asset?.url && (
                <img
                  src={author.image.asset.url}
                  alt={author.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover shrink-0"
                />
              )}
              <span className="font-semibold">{author.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat: any) => (
            <Link
              key={cat.slug?.current}
              href={`/blog?category=${cat.slug?.current}`}
              className="px-4 py-2 bradious text-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
