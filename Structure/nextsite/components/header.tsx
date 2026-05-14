'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from './logoMenu';

type MenuItem = {
  label: string;
  link: string;
  linkType?: 'page' | 'custom' | 'external';
  externalUrl?: string;
  openInNewTab?: boolean;
  asButton?: boolean;
  buttonBackgroundColor?: any;
  buttonTextColor?: any;
  buttonHoverBackgroundColor?: any;
  buttonHoverTextColor?: any;
  buttonHoverBorderColor?: any;
  buttonBorderColor?: any;
  buttonBorderWidth?: number;
  buttonBorderRadius?: number;
  buttonPaddingX?: number;
  buttonPaddingY?: number;
  subItems?: MenuItem[];
};

type HeaderSettings = {
  logoPosition?: 'left' | 'center' | 'right';
  menuPosition?: 'left' | 'center' | 'right';
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
  mobileIconType?: 'hamburger' | 'hamburger-bold' | 'dots-vertical' | 'dots-horizontal' | 'custom';
  mobileIconCustom?: { asset?: { url?: string } };
  mobileIconColor?: any;
  mobileIconBackgroundColor?: any;
  mobileIconSize?: number;
  mobileIconPadding?: number;
  mobileIconBorderRadius?: number;
  mobileDropdownBackgroundColor?: any;
  mobileDropdownTextColor?: any;
  mobileDropdownFontFamily?: string;
  mobileDropdownFontSize?: number;
  mobileDropdownPaddingX?: number;
  mobileDropdownPaddingY?: number;
  mobileDropdownBorderRadius?: number;
};

function toRgba(color: any): string | undefined {
  if (!color?.rgb) return undefined;
  const { r, g, b } = color.rgb;
  const a = color.alpha ?? 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function HamburgerIcon({ size, color }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="6"  x2="21" y2="6"  stroke={color || 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke={color || 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke={color || 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HamburgerBoldIcon({ size, color }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="6"  x2="21" y2="6"  stroke={color || 'currentColor'} strokeWidth="3" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke={color || 'currentColor'} strokeWidth="3" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" stroke={color || 'currentColor'} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DotsVerticalIcon({ size, color }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5"  r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

function DotsHorizontalIcon({ size, color }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} xmlns="http://www.w3.org/2000/svg">
      <circle cx="5"  cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

function MobileMenuIcon({ settings }: { settings: HeaderSettings }) {
  const size = settings.mobileIconSize ?? 28;
  const color = toRgba(settings.mobileIconColor);
  const bg = toRgba(settings.mobileIconBackgroundColor);
  const padding = settings.mobileIconPadding ?? 4;
  const borderRadius = settings.mobileIconBorderRadius ?? 4;
  const type = settings.mobileIconType ?? 'hamburger';

  const wrapStyle: React.CSSProperties = {
    backgroundColor: bg,
    padding: bg || padding ? `${padding}px` : undefined,
    borderRadius: `${borderRadius}px`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (type === 'custom' && settings.mobileIconCustom?.asset?.url) {
    return (
      <span style={wrapStyle}>
        <img src={settings.mobileIconCustom.asset.url} alt="Menu" width={size} height={size} style={{ display: 'block' }} />
      </span>
    );
  }
  if (type === 'hamburger-bold')  return <span style={wrapStyle}><HamburgerBoldIcon size={size} color={color} /></span>;
  if (type === 'dots-vertical')   return <span style={wrapStyle}><DotsVerticalIcon size={size} color={color} /></span>;
  if (type === 'dots-horizontal') return <span style={wrapStyle}><DotsHorizontalIcon size={size} color={color} /></span>;
  return <span style={wrapStyle}><HamburgerIcon size={size} color={color} /></span>;
}

export default function Header({
  menuItems = [],
  headerSettings = {},
}: {
  menuItems?: MenuItem[];
  headerSettings?: HeaderSettings;
}) {
  const [menu] = useState<MenuItem[]>(menuItems);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const router = useRouter();
  const hs = headerSettings;

  const isExternal = (item: MenuItem) =>
    item.linkType === 'external' || /^https?:\/\//i.test(item.link || '');

  const buildButtonStyle = (item: MenuItem): React.CSSProperties | undefined => {
    if (!item.asButton) return undefined;
    const backgroundColor = toRgba(item.buttonBackgroundColor);
    const color = toRgba(item.buttonTextColor);
    const hoverBg = toRgba(item.buttonHoverBackgroundColor);
    const hoverText = toRgba(item.buttonHoverTextColor);
    const hoverBorder = toRgba(item.buttonHoverBorderColor);
    const borderColor = toRgba(item.buttonBorderColor);
    const borderWidth = typeof item.buttonBorderWidth === 'number' ? item.buttonBorderWidth : 0;
    const borderRadius = typeof item.buttonBorderRadius === 'number' ? item.buttonBorderRadius : 9999;
    const paddingX = typeof item.buttonPaddingX === 'number' ? item.buttonPaddingX : 16;
    const paddingY = typeof item.buttonPaddingY === 'number' ? item.buttonPaddingY : 8;
    return {
      backgroundColor,
      color,
      ...(hoverBg     ? { ['--menu-btn-hover-bg'     as any]: hoverBg }     : {}),
      ...(hoverText   ? { ['--menu-btn-hover-text'   as any]: hoverText }   : {}),
      ...(hoverBorder ? { ['--menu-btn-hover-border' as any]: hoverBorder } : {}),
      ...(borderColor ? { ['--menu-btn-border'       as any]: borderColor } : {}),
      ...(color       ? { ['--menu-btn-text'         as any]: color }       : {}),
      borderColor,
      borderWidth,
      borderStyle: borderWidth ? 'solid' : undefined,
      borderRadius,
      padding: `${paddingY}px ${paddingX}px`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    };
  };

  const handleParentClick = (item: MenuItem) => {
    if (item.subItems?.length) {
      setOpenItem((prev) => (prev === item.label ? null : item.label));
    } else {
      setMobileOpen(false);
      setOpenItem(null);
      if (isExternal(item)) {
        window.location.href = item.link;
      } else {
        router.push(item.link);
      }
    }
  };

  const isOpen = (label: string) => openItem === label;

  // Header style — per-side borders + CSS var for text color
  const hasBorder = !!(hs.borderTopWidth || hs.borderRightWidth || hs.borderBottomWidth || hs.borderLeftWidth);
  const textColorVal = toRgba(hs.textColor);
  const textHoverColorVal = toRgba(hs.textHoverColor);

  const headerStyle: React.CSSProperties = {
    backgroundColor: toRgba(hs.backgroundColor) ?? undefined,
    color: textColorVal ?? undefined,
    ['--header-text-color' as any]: textColorVal ?? undefined,
    ['--header-text-hover-color' as any]: textHoverColorVal ?? undefined,
    fontFamily: hs.fontFamily ?? undefined,
    fontSize: hs.fontSize ? `${hs.fontSize}px` : undefined,
    borderTopWidth:    hs.borderTopWidth    ? `${hs.borderTopWidth}px`    : undefined,
    borderRightWidth:  hs.borderRightWidth  ? `${hs.borderRightWidth}px`  : undefined,
    borderBottomWidth: hs.borderBottomWidth ? `${hs.borderBottomWidth}px` : undefined,
    borderLeftWidth:   hs.borderLeftWidth   ? `${hs.borderLeftWidth}px`   : undefined,
    borderColor: hasBorder ? toRgba(hs.borderColor) : undefined,
    borderStyle: hasBorder ? (hs.borderStyle || 'solid') : undefined,
    paddingTop:    hs.paddingTop    != null ? `${hs.paddingTop}px`    : undefined,
    paddingBottom: hs.paddingBottom != null ? `${hs.paddingBottom}px` : undefined,
    paddingLeft:   hs.paddingLeft   != null ? `${hs.paddingLeft}px`   : undefined,
    paddingRight:  hs.paddingRight  != null ? `${hs.paddingRight}px`  : undefined,
  };

  // Mobile dropdown style
  const dropdownTextColor = toRgba(hs.mobileDropdownTextColor);
  const mobileDropdownStyle: React.CSSProperties = {
    backgroundColor: toRgba(hs.mobileDropdownBackgroundColor) ?? undefined,
    ['--header-text-color' as any]: dropdownTextColor ?? undefined,
    color: dropdownTextColor ?? undefined,
    fontFamily: hs.mobileDropdownFontFamily ?? undefined,
    fontSize: hs.mobileDropdownFontSize ? `${hs.mobileDropdownFontSize}px` : undefined,
    paddingLeft:   hs.mobileDropdownPaddingX != null ? `${hs.mobileDropdownPaddingX}px` : undefined,
    paddingRight:  hs.mobileDropdownPaddingX != null ? `${hs.mobileDropdownPaddingX}px` : undefined,
    paddingBottom: hs.mobileDropdownPaddingY != null ? `${hs.mobileDropdownPaddingY}px` : undefined,
    borderRadius:  hs.mobileDropdownBorderRadius != null ? `${hs.mobileDropdownBorderRadius}px` : undefined,
  };

  // 3-zone layout: logo and nav each go to their configured zone (left/center/right)
  const logoZone = hs.logoPosition ?? 'left';
  const menuZone = hs.menuPosition ?? 'right';

  const navLinks = (
    <ul className="flex items-center space-x-12">
      {menu.map((item) => (
        <li key={item.label} className="relative group flex items-center">
          {item.subItems?.length ? (
            <button
              onClick={() => handleParentClick(item)}
              className="menulink focus:outline-none flex items-center gap-1"
              style={buildButtonStyle(item)}
            >
              {item.label}
              <img
                src="/menu-arrow.svg"
                alt="arrow"
                className={`transition-transform duration-200 ml-1 w-3 h-3 ${isOpen(item.label) ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          ) : isExternal(item) ? (
            <a
              href={item.link}
              className={`menulink focus:outline-none flex items-center gap-1${item.asButton ? ' menu-button' : ''}`}
              style={buildButtonStyle(item)}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={item.link}
              className={`menulink focus:outline-none flex items-center gap-1${item.asButton ? ' menu-button' : ''}`}
              style={buildButtonStyle(item)}
            >
              {item.label}
            </Link>
          )}
          {item.subItems && isOpen(item.label) && (
            <ul className="absolute left-0 top-full mt-2 sublinkback rounded-md z-50 min-w-[15rem] shadow-lg">
              {item.subItems.map((sub) => (
                <li key={sub.label}>
                  {isExternal(sub) ? (
                    <a
                      href={sub.link}
                      className={`block px-4 py-2 text-sm menulink sublink${sub.asButton ? ' menu-button' : ''}`}
                      onClick={() => setOpenItem(null)}
                      style={buildButtonStyle(sub)}
                      target={sub.openInNewTab ? '_blank' : undefined}
                      rel={sub.openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {sub.label}
                    </a>
                  ) : (
                    <Link
                      href={sub.link}
                      className={`block px-4 py-2 text-sm menulink sublink${sub.asButton ? ' menu-button' : ''}`}
                      onClick={() => setOpenItem(null)}
                      style={buildButtonStyle(sub)}
                    >
                      {sub.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <header className="relative z-50" style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>

        {/* Left zone */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
          {logoZone === 'left' && <Link href="/"><Logo /></Link>}
          {menuZone === 'left' && <nav className="hidden xl:flex">{navLinks}</nav>}
        </div>

        {/* Center zone */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          {logoZone === 'center' && <Link href="/"><Logo /></Link>}
          {menuZone === 'center' && <nav className="hidden xl:flex">{navLinks}</nav>}
        </div>

        {/* Right zone — hamburger always here */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
          {logoZone === 'right' && <Link href="/"><Logo /></Link>}
          {menuZone === 'right' && <nav className="hidden xl:flex">{navLinks}</nav>}
          <button
            className="nobr xl:hidden flex items-center focus:outline-none"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <MobileMenuIcon settings={hs} />
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav
          className="absolute top-full left-0 w-full sublinkbackmob z-40"
          style={mobileDropdownStyle}
        >
          <ul className="flex flex-col space-y-2">
            {menu.map((item) => (
              <li key={item.label}>
                {item.subItems?.length ? (
                  <button
                    onClick={() => handleParentClick(item)}
                    className="w-full text-left menulink py-2 flex items-center gap-1"
                    style={buildButtonStyle(item)}
                  >
                    <span>{item.label}</span>
                    <img
                      src="/menu-arrow.svg"
                      alt="arrow"
                      className={`arrowalig transition-transform duration-200 w-3 h-3 ${isOpen(item.label) ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </button>
                ) : isExternal(item) ? (
                  <a
                    href={item.link}
                    className={`w-full text-left menulink py-2 flex items-center gap-1${item.asButton ? ' menu-button' : ''}`}
                    style={buildButtonStyle(item)}
                    onClick={() => { setMobileOpen(false); setOpenItem(null); }}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.link}
                    className={`w-full text-left menulink py-2 flex items-center gap-1${item.asButton ? ' menu-button' : ''}`}
                    style={buildButtonStyle(item)}
                    onClick={() => { setMobileOpen(false); setOpenItem(null); }}
                  >
                    {item.label}
                  </Link>
                )}
                {item.subItems && isOpen(item.label) && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <li key={sub.label}>
                        {isExternal(sub) ? (
                          <a
                            href={sub.link}
                            className="block py-1 text-sm menulink sublink"
                            style={buildButtonStyle(sub)}
                            onClick={() => { setMobileOpen(false); setOpenItem(null); }}
                            target={sub.openInNewTab ? '_blank' : undefined}
                            rel={sub.openInNewTab ? 'noopener noreferrer' : undefined}
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <Link
                            href={sub.link}
                            className="block py-1 text-sm menulink sublink"
                            style={buildButtonStyle(sub)}
                            onClick={() => { setMobileOpen(false); setOpenItem(null); }}
                          >
                            {sub.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
