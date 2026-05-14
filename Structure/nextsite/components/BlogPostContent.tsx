'use client';

import React, { ElementType, CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import portableTextComponents from './pte';

function toRgba(color: any): string | undefined {
  if (!color?.rgb) return undefined;
  const { r, g, b } = color.rgb;
  const a = color.alpha ?? 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getSectionBg(item: any): CSSProperties {
  const color = toRgba(item?.backgroundColor);
  const url = item?.backgroundImage?.asset?.url;
  return {
    backgroundImage:
      color && url
        ? `linear-gradient(${color}, ${color}), url(${url})`
        : url
        ? `url(${url})`
        : undefined,
    backgroundSize: url ? 'cover' : undefined,
    backgroundPosition: url ? 'center' : undefined,
    backgroundColor: url ? undefined : color,
  };
}

function gridClass(cols: number): string {
  const map: Record<number, string> = {
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-1 sm:grid-cols-2',
    3: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  return map[cols] || 'grid grid-cols-1';
}

export default function BlogPostContent({ post }: { post: any }) {
  // Column layout — mirrors PageRenderer's ColumnBackBlock
  if (Array.isArray(post.columnContent) && post.columnContent.length > 0) {
    const numCols = Math.max(1, Math.min(4, parseInt(post.columnLayout || '1', 10)));
    return (
      <section style={{ ...getSectionBg(post), color: toRgba(post.textColor) || undefined }}>
        <div className={`padcont ${gridClass(numCols)} gap-6`}>
          {post.columnContent.map((col: any, i: number) => {
            const Tag = col.heading ? (col.heading as ElementType) : null;
            return (
              <div
                key={col._key || i}
                className="bradious containerover"
                style={{ ...getSectionBg(col), color: toRgba(col.textColor) || undefined, height: '100%' }}
              >
                <div className="containerover padtop padbot padlef padrig">
                  {Tag && <Tag>{col.title}</Tag>}
                  {Array.isArray(col.content) && col.content.length > 0 && (
                    <PortableText value={col.content} components={portableTextComponents} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Fallback — simple content array (legacy / plain blog posts)
  if (Array.isArray(post.content) && post.content.length > 0) {
    return (
      <div>
        <PortableText value={post.content} components={portableTextComponents} />
      </div>
    );
  }

  return null;
}
