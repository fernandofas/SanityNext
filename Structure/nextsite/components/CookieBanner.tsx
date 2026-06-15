'use client';

import React from 'react';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import CookieSettings from './CookieSettings';

interface RgbaColor { rgb?: { r: number; g: number; b: number }; alpha?: number }
interface CookieBannerData {
  bannerText?: string;
  acceptButtonText?: string;
  rejectButtonText?: string;
  settingsButtonText?: string;
  privacyPolicyLink?: { text?: string; url?: string };
  cookieScript?: string;
  // Banner style
  backgroundColor?: RgbaColor;
  textColor?: RgbaColor;
  bannerPaddingTop?: number; bannerPaddingBottom?: number; bannerPaddingLeft?: number; bannerPaddingRight?: number;
  bannerBorderTopWidth?: number; bannerBorderRightWidth?: number; bannerBorderBottomWidth?: number; bannerBorderLeftWidth?: number;
  bannerBorderColor?: RgbaColor;
  bannerBorderStyle?: string;
  // Accept button
  acceptButtonBg?: RgbaColor; acceptButtonText_color?: RgbaColor;
  acceptButtonHoverBg?: RgbaColor; acceptButtonHoverTextColor?: RgbaColor;
  acceptButtonBorderRadius?: number;
  // Reject button
  rejectButtonBg?: RgbaColor; rejectButtonTextColor?: RgbaColor; rejectButtonBorderColor?: RgbaColor;
  rejectButtonHoverBg?: RgbaColor; rejectButtonHoverTextColor?: RgbaColor; rejectButtonHoverBorderColor?: RgbaColor;
  rejectButtonBorderRadius?: number;
  // Settings button
  settingsButtonBg?: RgbaColor; settingsButtonTextColor?: RgbaColor; settingsButtonBorderColor?: RgbaColor;
  settingsButtonHoverBg?: RgbaColor; settingsButtonHoverTextColor?: RgbaColor; settingsButtonHoverBorderColor?: RgbaColor;
  settingsButtonBorderRadius?: number;
  // Popup / modal
  popupBackgroundColor?: RgbaColor; popupTextColor?: RgbaColor;
  popupBorderColor?: RgbaColor; popupBorderWidth?: number; popupBorderRadius?: number;
  popupPaddingX?: number; popupPaddingY?: number;
  overlayColor?: RgbaColor; popupFontFamily?: string; popupFontSize?: number;
  toggleOnColor?: RgbaColor; toggleOffColor?: RgbaColor;
  saveButtonBg?: RgbaColor; saveButtonTextColor?: RgbaColor; saveButtonBorderRadius?: number;
  saveButtonHoverBg?: RgbaColor; saveButtonHoverTextColor?: RgbaColor;
  cancelButtonBg?: RgbaColor; cancelButtonTextColor?: RgbaColor; cancelButtonBorderColor?: RgbaColor; cancelButtonBorderRadius?: number;
  cancelButtonHoverBg?: RgbaColor; cancelButtonHoverTextColor?: RgbaColor; cancelButtonHoverBorderColor?: RgbaColor;
}

function toRgba(color?: RgbaColor, fallback = ''): string {
  if (!color?.rgb) return fallback;
  const { r, g, b } = color.rgb;
  return `rgba(${r},${g},${b},${color.alpha ?? 1})`;
}

export function CookieBanner({ data, popupData }: { data?: CookieBannerData | null; popupData?: any }) {
  const { showBanner, acceptAll, rejectAll } = useCookieConsent();
  const [showSettings, setShowSettings] = React.useState(false);
  const [acceptHover, setAcceptHover] = React.useState(false);
  const [rejectHover, setRejectHover] = React.useState(false);
  const [settingsHover, setSettingsHover] = React.useState(false);

  if (!showBanner) return null;

  if (data?.cookieScript) {
    return <div dangerouslySetInnerHTML={{ __html: data.cookieScript }} suppressHydrationWarning />;
  }

  const hasBannerBorder = !!(data?.bannerBorderTopWidth || data?.bannerBorderRightWidth || data?.bannerBorderBottomWidth || data?.bannerBorderLeftWidth);

  const bannerStyle: React.CSSProperties = {
    backgroundColor: toRgba(data?.backgroundColor, 'var(--dark-green)'),
    color: toRgba(data?.textColor, '') || undefined,
    paddingTop: data?.bannerPaddingTop != null ? `${data.bannerPaddingTop}px` : undefined,
    paddingBottom: data?.bannerPaddingBottom != null ? `${data.bannerPaddingBottom}px` : undefined,
    paddingLeft: data?.bannerPaddingLeft != null ? `${data.bannerPaddingLeft}px` : undefined,
    paddingRight: data?.bannerPaddingRight != null ? `${data.bannerPaddingRight}px` : undefined,
    borderTopWidth: data?.bannerBorderTopWidth != null ? `${data.bannerBorderTopWidth}px` : undefined,
    borderRightWidth: data?.bannerBorderRightWidth != null ? `${data.bannerBorderRightWidth}px` : undefined,
    borderBottomWidth: data?.bannerBorderBottomWidth != null ? `${data.bannerBorderBottomWidth}px` : undefined,
    borderLeftWidth: data?.bannerBorderLeftWidth != null ? `${data.bannerBorderLeftWidth}px` : undefined,
    borderColor: hasBannerBorder ? (toRgba(data?.bannerBorderColor, 'rgba(255,255,255,0.1)')) : undefined,
    borderStyle: hasBannerBorder ? (data?.bannerBorderStyle ?? 'solid') : undefined,
  };

  const acceptBg = acceptHover
    ? (toRgba(data?.acceptButtonHoverBg, '') || toRgba(data?.acceptButtonBg, '#00FFC2'))
    : toRgba(data?.acceptButtonBg, '#00FFC2');
  const acceptTxt = acceptHover
    ? (toRgba(data?.acceptButtonHoverTextColor, '') || toRgba(data?.acceptButtonText_color, '#1C2532'))
    : toRgba(data?.acceptButtonText_color, '#1C2532');

  const rejectBg = rejectHover ? (toRgba(data?.rejectButtonHoverBg, '') || toRgba(data?.rejectButtonBg, '')) : toRgba(data?.rejectButtonBg, '');
  const rejectTxt = rejectHover ? (toRgba(data?.rejectButtonHoverTextColor, '') || toRgba(data?.rejectButtonTextColor, '')) : toRgba(data?.rejectButtonTextColor, '');
  const rejectBorder = rejectHover
    ? (toRgba(data?.rejectButtonHoverBorderColor, '') || toRgba(data?.rejectButtonBorderColor, 'rgba(255,255,255,0.3)'))
    : toRgba(data?.rejectButtonBorderColor, 'rgba(255,255,255,0.3)');

  const settingsBg = settingsHover ? (toRgba(data?.settingsButtonHoverBg, '') || toRgba(data?.settingsButtonBg, '')) : toRgba(data?.settingsButtonBg, '');
  const settingsTxt = settingsHover ? (toRgba(data?.settingsButtonHoverTextColor, '') || toRgba(data?.settingsButtonTextColor, '')) : toRgba(data?.settingsButtonTextColor, '');
  const settingsBorder = settingsHover
    ? (toRgba(data?.settingsButtonHoverBorderColor, '') || toRgba(data?.settingsButtonBorderColor, 'rgba(255,255,255,0.3)'))
    : toRgba(data?.settingsButtonBorderColor, 'rgba(255,255,255,0.3)');

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50" style={bannerStyle}>
        <div className="padcont flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between py-4 px-6">
          <div className="text-sm opacity-90 max-w-2xl">
            <p>{data?.bannerText || 'We use cookies to improve your experience. Essential cookies are always active. Analytics and marketing cookies require your consent.'}</p>
            {data?.privacyPolicyLink?.url && (
              <a href={data.privacyPolicyLink.url} className="underline opacity-70 hover:opacity-100 text-xs mt-1 inline-block">
                {data.privacyPolicyLink.text || 'Privacy Policy'}
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setShowSettings(true)}
              onMouseEnter={() => setSettingsHover(true)}
              onMouseLeave={() => setSettingsHover(false)}
              className="text-sm px-4 py-2 transition-colors"
              style={{
                backgroundColor: settingsBg || 'transparent',
                color: settingsTxt || undefined,
                borderColor: settingsBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: data?.settingsButtonBorderRadius != null ? `${data.settingsButtonBorderRadius}px` : '6px',
                cursor: 'pointer',
              }}
            >
              {data?.settingsButtonText || 'Settings'}
            </button>
            <button
              onClick={rejectAll}
              onMouseEnter={() => setRejectHover(true)}
              onMouseLeave={() => setRejectHover(false)}
              className="text-sm px-4 py-2 transition-colors"
              style={{
                backgroundColor: rejectBg || 'transparent',
                color: rejectTxt || undefined,
                borderColor: rejectBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: data?.rejectButtonBorderRadius != null ? `${data.rejectButtonBorderRadius}px` : '6px',
                cursor: 'pointer',
              }}
            >
              {data?.rejectButtonText || 'Reject all'}
            </button>
            <button
              onClick={acceptAll}
              onMouseEnter={() => setAcceptHover(true)}
              onMouseLeave={() => setAcceptHover(false)}
              className="text-sm px-4 py-2 transition-colors"
              style={{
                backgroundColor: acceptBg,
                color: acceptTxt,
                borderRadius: data?.acceptButtonBorderRadius != null ? `${data.acceptButtonBorderRadius}px` : '9999px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {data?.acceptButtonText || 'Accept all'}
            </button>
          </div>
        </div>
      </div>

      {showSettings && <CookieSettings onClose={() => setShowSettings(false)} bannerData={data} popupData={popupData} />}
    </>
  );
}

