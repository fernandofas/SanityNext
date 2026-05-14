'use client';

import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import portableTextComponents from './pte';
import { urlFor } from '../lib/sanity';

type FooterLink = { label: string; link: string };
type FooterMenu = {
  title: string;
  column: string;
  links: FooterLink[];
};
type FooterSettings = {
  logo?: { asset: { _ref?: string; url?: string } };
  address?: string;
  email?: string;
  backgroundColor?: any;
  textColor?: any;
  textHoverColor?: any;
  fontFamily?: string;
  fontSize?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderColor?: any;
  borderStyle?: string;
};
type FooterContent = {
  content?: any[];
  backgroundColor?: any;
  backgroundImage?: { asset?: { _ref?: string; url?: string } };
  textColor?: any;
};

function toRgba(color: any): string | undefined {
  if (!color?.rgb) return undefined;
  const { r, g, b } = color.rgb;
  const a = color.alpha ?? 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function Footer({
  menus = [],
  settings = null,
  footerContent = null,
}: {
  menus?: FooterMenu[];
  settings?: FooterSettings | null;
  footerContent?: FooterContent | null;
}) {
  const columnMap: Record<string, number> = { column1: 1, column2: 2, column3: 3, column4: 4 };
  const columns = Array.from({ length: 4 }, (_, i) =>
    menus.filter((m) => columnMap[m.column] === i + 1)
  );

  const getBg = (content: FooterContent) => {
    const color = toRgba(content.backgroundColor);
    const url = content.backgroundImage?.asset?._ref
      ? urlFor(content.backgroundImage).url()
      : content.backgroundImage?.asset?.url;
    return {
      backgroundImage: color && url
        ? `linear-gradient(${color}, ${color}), url(${url})`
        : url ? `url(${url})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: url ? undefined : color,
    };
  };

  const hasBorder = !!(settings?.borderTopWidth || settings?.borderRightWidth || settings?.borderBottomWidth || settings?.borderLeftWidth);
  const footerStyle: React.CSSProperties = settings ? {
    backgroundColor: toRgba(settings.backgroundColor) ?? undefined,
    color: toRgba(settings.textColor) ?? undefined,
    ['--footer-text-color' as any]: toRgba(settings.textColor) ?? undefined,
    ['--footer-text-hover-color' as any]: toRgba(settings.textHoverColor) ?? undefined,
    fontFamily: settings.fontFamily ?? undefined,
    fontSize: settings.fontSize ? `${settings.fontSize}px` : undefined,
    borderTopWidth:    settings.borderTopWidth    ? `${settings.borderTopWidth}px`    : undefined,
    borderRightWidth:  settings.borderRightWidth  ? `${settings.borderRightWidth}px`  : undefined,
    borderBottomWidth: settings.borderBottomWidth ? `${settings.borderBottomWidth}px` : undefined,
    borderLeftWidth:   settings.borderLeftWidth   ? `${settings.borderLeftWidth}px`   : undefined,
    borderColor: hasBorder ? toRgba(settings.borderColor) : undefined,
    borderStyle: hasBorder ? (settings.borderStyle || 'solid') : undefined,
    paddingTop:    settings.paddingTop    != null ? `${settings.paddingTop}px`    : undefined,
    paddingBottom: settings.paddingBottom != null ? `${settings.paddingBottom}px` : undefined,
    paddingLeft:   settings.paddingLeft   != null ? `${settings.paddingLeft}px`   : undefined,
    paddingRight:  settings.paddingRight  != null ? `${settings.paddingRight}px`  : undefined,
  } : {};

  return (
    <footer className="text-white" style={footerStyle}>
      {footerContent?.content?.length ? (
        <div className="w-full" style={{ ...getBg(footerContent), color: toRgba(footerContent.textColor) || undefined }}>
          <div className="py-10">
            <div className="padcont">
              <div className="grid grid-cols-1 gap-8">
                <div className="col-span-1">
                  <PortableText value={footerContent.content} components={portableTextComponents} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="py-12 px-4">
        <div className="padcont grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {columns.map((menusInColumn, idx) => (
            <div key={idx}>
              {menusInColumn.map((menu) => (
                <div key={menu.title} className="mb-6">
                  <h4 className="font-bold mb-3 opacity-80">{menu.title}</h4>
                  <ul className="nobullet space-y-2">
                    {menu.links?.map((link) => (
                      <li key={link.label}>
                        {/^https?:\/\//.test(link.link) ? (
                          <a href={link.link} className="sublink text-sm" target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.link} className="sublink text-sm">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* Settings column: logo + address */}
          {settings && (
            <div className="lg:col-start-5">
              {settings.logo?.asset && (
                <img
                  src={urlFor(settings.logo).height(40).url()}
                  alt="Logo"
                  height={40}
                  className="mb-4 h-10 w-auto"
                />
              )}
              {settings.address && <p className="text-sm opacity-70">{settings.address}</p>}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="text-sm opacity-70 hover:opacity-100">
                  {settings.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
