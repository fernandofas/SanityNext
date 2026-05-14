'use client';

import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import ContactForm from './ContactForm';
import SliderBlock from './SliderBlock';
import { motion } from 'framer-motion';
import { urlFor } from '../lib/sanity';
import { useInView } from 'react-intersection-observer';

// DOMPurify is browser-only — guard against SSR
const sanitizeHtml = (html: string): string => {
  if (typeof window === 'undefined') return '';
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const DOMPurify = require('dompurify');
    return DOMPurify.sanitize(html) as string;
  } catch {
    return '';
  }
};

function toRgba(color: any): string | undefined {
  if (!color?.rgb) return undefined;
  const { r, g, b } = color.rgb;
  const a = color.alpha ?? 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getSectionStyle(item: any): React.CSSProperties {
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

function colorToCss(color: any): string | undefined {
  if (color?.hex) return color.hex as string;
  return toRgba(color);
}

function buildImageNode(value: any, options?: { forceAutoSize?: boolean }) {
  if (!value?.asset?._ref && !value?.asset?._id) return null;

  const imageUrl = urlFor(value)?.fit('max').auto('format').url();
  if (!imageUrl) return null;

  const originalFilename = value.asset?.originalFilename as string | undefined;
  let altTextCandidate =
    value.alt ||
    value.asset?.altText ||
    value.asset?.title ||
    originalFilename ||
    'Image';
  if (originalFilename && altTextCandidate === originalFilename) {
    altTextCandidate = altTextCandidate.replace(/\.(webp|png|jpe?g|gif|svg|avif)$/i, '');
  }
  const altText = altTextCandidate;

  const widthOverride = typeof value.width === 'number' ? value.width : undefined;
  const heightOverride = typeof value.height === 'number' ? value.height : undefined;
  const width = widthOverride ?? value.asset?.metadata?.dimensions?.width ?? '100%';
  const height = heightOverride ?? value.asset?.metadata?.dimensions?.height ?? 'auto';

  const style: React.CSSProperties | undefined =
    widthOverride || heightOverride || options?.forceAutoSize
      ? {
          ...(widthOverride ? { width: `${widthOverride}px` } : options?.forceAutoSize ? { width: 'auto' } : {}),
          ...(heightOverride ? { height: `${heightOverride}px` } : options?.forceAutoSize ? { height: 'auto' } : {}),
          ...(options?.forceAutoSize ? { maxWidth: '100%' } : {}),
        }
      : undefined;

  let href: string | undefined;
  let target: string | undefined;
  let rel: string | undefined;
  if (value.linkType === 'external' && value.externalUrl) {
    href = value.externalUrl;
    target = '_blank';
    rel = 'noopener noreferrer';
  } else if (value.linkType === 'internal') {
    const slug = value.internalLink?.slug?.current;
    if (slug) href = `/${slug}`;
  } else if (value.linkType === 'email' && value.emailAddress) {
    href = `mailto:${value.emailAddress}`;
  }

  const image = (
    <img
      src={imageUrl}
      alt={altText}
      width={width}
      height={height}
      loading="lazy"
      className="imaset"
      style={style}
    />
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel}>
        {image}
      </a>
    );
  }

  return image;
}

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const node = buildImageNode(value);
      if (!node) return null;
      return <Reveal>{node}</Reveal>;
    },

    imageGroup: ({ value }) => {
      if (!Array.isArray(value?.images)) return null;

      const isRow = (value.layout || 'row') === 'row';

      // Map schema values to CSS flex values
      const justifyMap: Record<string, string> = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
      };
      const alignMap: Record<string, string> = {
        top: 'flex-start',
        center: 'center',
        bottom: 'flex-end',
        stretch: 'stretch',
      };

      const justify = justifyMap[value.horizontalAlign] || 'center';
      const align = alignMap[value.verticalAlign] || 'center';
      const gap = typeof value.gap === 'number' ? value.gap : 16;
      const wrap = value.wrap !== false;

      const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: isRow ? 'row' : 'column',
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: `${gap}px`,
        marginTop: '16px',
        marginBottom: '16px',
      };

      return (
        <div style={containerStyle}>
          {value.images.map((img: any, i: number) => {
            const node = buildImageNode(img, { forceAutoSize: true });
            return node ? <span key={i} style={{ display: 'inline-block' }}>{node}</span> : null;
          })}
        </div>
      );
    },

    button: ({ value }) => {
      if (!value?.text) return null;
      let href = '#';
      let target: string | undefined;
      let rel: string | undefined;
      if (value.linkType === 'external' && value.externalUrl) {
        href = value.externalUrl;
        target = '_blank';
        rel = 'noopener noreferrer';
      } else if (value.linkType === 'internal') {
        const slug = value.internalLink?.slug?.current;
        if (slug) href = `/${slug}`;
      } else if (value.linkType === 'email' && value.emailAddress) {
        href = `mailto:${value.emailAddress}`;
      }

      const bg = toRgba(value.backgroundColor);
      const color = toRgba(value.textColor);
      const hoverBg = toRgba(value.hoverBackgroundColor);
      const hoverColor = toRgba(value.hoverTextColor);
      const borderColor = toRgba(value.borderColor);
      // schema field is borderThickness, not borderWidth
      const borderWidth = typeof value.borderThickness === 'number' ? value.borderThickness : 0;
      const borderRadius = typeof value.borderRadius === 'number' ? value.borderRadius : 9999;

      const btnStyle: React.CSSProperties = {
        ...(bg ? { ['--sanity-btn-bg' as any]: bg } : {}),
        ...(color ? { ['--sanity-btn-color' as any]: color } : {}),
        ...(hoverBg ? { ['--sanity-btn-hover-bg' as any]: hoverBg } : {}),
        ...(hoverColor ? { ['--sanity-btn-hover-text' as any]: hoverColor } : {}),
        borderColor: borderWidth ? borderColor : undefined,
        borderWidth: borderWidth || undefined,
        borderStyle: borderWidth ? 'solid' : undefined,
        borderRadius,
        padding: '10px 24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
      };

      const align = value.buttonAlign || 'left';
      const wrapStyle: React.CSSProperties = {
        textAlign: align === 'right' ? 'right' : align === 'center' ? 'center' : 'left',
        display: 'block',
        marginTop: '8px',
        marginBottom: '8px',
      };

      return (
        <span style={wrapStyle}>
          <a href={href} target={target} rel={rel} className="sanity-btn" style={btnStyle}>
            {value.text}
          </a>
        </span>
      );
    },

    code: ({ value }) => {
      if (!value?.code) return null;
      if (value.language === 'html') {
        return (
          <div
            className="my-4"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(value.code) }}
          />
        );
      }
      return <pre className="my-4 p-4 bg-black/20 rounded overflow-x-auto"><code>{value.code}</code></pre>;
    },

    video: ({ value }) => {
      if (!value) return null;

      // Uploaded video
      if (value.kind === 'upload') {
        const src = value.file?.asset?.url;
        if (!src) return null;
        const paddingMap: Record<string, string> = { '4:3': '75%', '1:1': '100%' };
        const padding = paddingMap[value.aspectRatio] || '56.25%'; // default 16:9
        return (
          <div className="relative my-4" style={{ paddingBottom: padding, height: 0 }}>
            <video
              src={src}
              poster={value.poster?.asset?.url}
              autoPlay={value.autoplay}
              controls={value.controls !== false}
              loop={value.loop}
              muted={value.muted || value.autoplay}
              playsInline={value.playsInline !== false}
              className="absolute inset-0 w-full h-full rounded object-contain"
            />
          </div>
        );
      }

      // YouTube
      if (value.kind === 'youtube' || value.youtubeUrl) {
        const rawUrl: string = value.youtubeUrl || '';
        const id =
          rawUrl.match(/[?&]v=([^&]+)/)?.[1] ||
          rawUrl.match(/youtu\.be\/([^?&]+)/)?.[1] ||
          rawUrl.match(/\/embed\/([^?&]+)/)?.[1];
        if (!id) return null;
        const params = value.autoplay ? '?autoplay=1&mute=1' : '';
        const paddingMap: Record<string, string> = { '4:3': '75%', '1:1': '100%' };
        const padding = paddingMap[value.aspectRatio] || '56.25%';
        return (
          <div className="relative my-4" style={{ paddingBottom: padding, height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${id}${params}`}
              className="absolute inset-0 w-full h-full rounded"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={value.title || 'Video'}
            />
          </div>
        );
      }

      return null;
    },

    iframe: ({ value }) => {
      // Schema field is 'src', not 'url'
      if (!value?.src) return null;
      const width = value.width || '100%';
      const height = value.height || '400';
      return (
        <div className="my-4 w-full overflow-hidden rounded" style={{ height: typeof height === 'number' ? `${height}px` : height }}>
          <iframe
            src={value.src}
            title={value.title || 'Embedded content'}
            width={width}
            height={height}
            allow={value.allow || undefined}
            allowFullScreen={value.allowFullScreen !== false}
            referrerPolicy={value.referrerPolicy || undefined}
            sandbox={value.sandbox || undefined}
            className="w-full h-full border-0"
          />
        </div>
      );
    },

    form: ({ value }) => {
      if (!value?.fields) return null;
      return (
        <div className="my-4 formamaxwidth">
          <ContactForm
            fields={value.fields || []}
            submitText={value.submitText}
            emailTo={value.emailTo}
            submitBgColor={value.submitBgColor}
            submitTextColor={value.submitTextColor}
            submithoverBackgroundColor={value.submithoverBackgroundColor}
            submithoverTextColor={value.submithoverTextColor}
            formStyle={value.formStyle}
          />
        </div>
      );
    },

    slider: ({ value }) => {
      if (!value) return null;
      return (
        <div className="my-4" style={{ overflow: 'visible' }}>
          <SliderBlock data={value} />
        </div>
      );
    },

    accordion: ({ value }) => {
      if (!Array.isArray(value?.items)) return null;
      return (
        <div className="my-4 space-y-2">
          {value.items.map((item: any, i: number) => (
            <details key={i} className="bradious p-4" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <summary className="cursor-pointer font-semibold">{item.question}</summary>
              {item.answer && (
                <div className="mt-2">
                  <PortableText value={item.answer} components={portableTextComponents} />
                </div>
              )}
            </details>
          ))}
        </div>
      );
    },

    // Standalone link object (not a mark)
    link: ({ value }) => {
      if (!value?.text) return null;
      let href = '#';
      let target: string | undefined;
      let rel: string | undefined;
      if (value.linkType === 'external' && value.externalUrl) {
        href = value.externalUrl;
        target = '_blank';
        rel = 'noopener noreferrer';
      } else if (value.linkType === 'internal') {
        const slug = value.internalLink?.slug?.current;
        if (slug) href = `/${slug}`;
      } else if (value.linkType === 'email' && value.emailAddress) {
        href = `mailto:${value.emailAddress}`;
      }
      const color = colorToCss(value.textColor);
      const alignClass =
        value.linkAlign === 'center' ? 'block text-center' :
        value.linkAlign === 'right'  ? 'block text-right'  : '';
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={`underline ${alignClass}`.trim()}
          style={color ? { color } : undefined}
        >
          {value.text}
        </a>
      );
    },

    // Icon object
    icon: ({ value }) => {
      if (!value?.icon) return null;
      const size = value.iconsize || 32;
      const color = value.color?.hex || 'currentColor';
      const align = value.iconAlign || 'left';

      // Alignment via a block wrapper — mx-auto/ml-auto don't work on inline-block
      const wrapStyle: React.CSSProperties = {
        display: 'block',
        textAlign: align === 'center' ? 'center' : align === 'right' ? 'right' : 'left',
        marginTop: '8px',
        marginBottom: '8px',
      };

      if (value.icon === 'customSvg' && value.svgCode) {
        return (
          <span style={wrapStyle}>
            <span
              style={{ display: 'inline-block', width: size, height: size, color }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(value.svgCode) }}
            />
          </span>
        );
      }

      const icons: Record<string, string> = {
        star:  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        check: 'M20 6L9 17l-5-5',
        smile: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01',
        alert: 'M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
      };

      const d = icons[value.icon];
      if (!d) return null;

      return (
        <span style={wrapStyle}>
          <svg
            style={{ display: 'inline-block' }}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={d} />
          </svg>
        </span>
      );
    },

    // Nested sections document (referenced from columnBack content)
    sections: ({ value }) => {
      if (!Array.isArray(value?.content)) return null;
      return (
        <div>
          {value.content.map((cs: any, i: number) => {
            const layout = cs.columnLayout || '1';
            let columns: any[];
            if (layout === '1') columns = [cs.column0 || []];
            else if (layout === '2') columns = [cs.column1 || [], cs.column2 || []];
            else if (layout === '3') columns = [cs.column1 || [], cs.column2 || [], cs.column3 || []];
            else columns = [cs.column1 || [], cs.column2 || [], cs.column3 || [], cs.column4 || []];
            const sectionBg = getSectionStyle(cs);
            const sectionTextColor = toRgba(cs.textColor);
            const gridCols =
              columns.length === 2 ? 'sm:grid-cols-2' :
              columns.length === 3 ? 'md:grid-cols-3' :
              columns.length >= 4 ? 'lg:grid-cols-4' : '';
            return (
              <div
                key={i}
                style={{ ...sectionBg, color: sectionTextColor || undefined }}
                className={`padcont grid gap-6 ${gridCols}`}
              >
                {columns.map((col, ci) => (
                  <div key={ci} className="padtop padbot">
                    {Array.isArray(col) && col.length > 0 && (
                      <PortableText value={col} components={portableTextComponents} />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      );
    },
  },

  marks: {
    // ── Inline annotations ────────────────────────────────────────────────
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="underline"
        >
          {children}
        </a>
      );
    },

    // ── Standard decorators ───────────────────────────────────────────────
    strong:    ({ children }) => <strong>{children}</strong>,
    em:        ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
    'strike-through': ({ children }) => <span style={{ textDecoration: 'line-through' }}>{children}</span>,
    code:      ({ children }) => <code className="bg-black/20 px-1 rounded font-mono text-sm">{children}</code>,

    // ── Color decorator ───────────────────────────────────────────────────
    color: ({ value, children }) => (
      <span style={{ color: colorToCss(value) }}>{children}</span>
    ),

    // ── Alignment decorators ──────────────────────────────────────────────
    // Defined as decorators in blockContent.ts, so they arrive as span marks.
    // display:block makes text-align take effect inside the inline flow.
    left:    ({ children }) => <span style={{ display: 'block', textAlign: 'left' }}>{children}</span>,
    center:  ({ children }) => <span style={{ display: 'block', textAlign: 'center' }}>{children}</span>,
    right:   ({ children }) => <span style={{ display: 'block', textAlign: 'right' }}>{children}</span>,
    justify: ({ children }) => <span style={{ display: 'block', textAlign: 'justify' }}>{children}</span>,
  },

  block: {
    normal: ({ children }) => <p className="mb-3">{children}</p>,
    h1: ({ children }) => <h1 className="mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-3">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-current pl-4 italic my-4">{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

export default portableTextComponents;
