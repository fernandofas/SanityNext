'use client';

import React, { useState } from 'react';
import { useCookieConsent } from '../contexts/CookieConsentContext';

interface RgbaColor { rgb?: { r: number; g: number; b: number }; alpha?: number }

interface CookieSettingsProps {
  onClose: () => void;
  bannerData?: any;
  popupData?: any;
}

/** Handles plain CSS strings (from cookiePopupSettings) and {rgb,alpha} objects (legacy cookieBanner fields). */
function resolveColor(c: any, fallback = ''): string {
  if (!c) return fallback;
  if (typeof c === 'string') return c || fallback;
  if (c?.rgb) {
    const { r, g, b } = c.rgb;
    return `rgba(${r},${g},${b},${c.alpha ?? 1})`;
  }
  return fallback;
}

export default function CookieSettings({ onClose, bannerData, popupData }: CookieSettingsProps) {
  const { consent, acceptSelected } = useCookieConsent();
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const [saveHover, setSaveHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);

  const handleSave = () => {
    acceptSelected({ essential: true, analytics, marketing });
    onClose();
  };

  // popupData fields take precedence; fall back to bannerData popup fields for backward compat
  const p = popupData;
  const b = bannerData;

  const overlayBg   = resolveColor(p?.overlayColor, resolveColor(b?.overlayColor, 'rgba(0,0,0,0.6)'));
  const modalBg     = resolveColor(p?.popupBackgroundColor, resolveColor(b?.popupBackgroundColor, 'var(--dark-green)'));
  const modalText   = resolveColor(p?.popupTextColor, resolveColor(b?.popupTextColor, '')) || undefined;
  const modalBorder = resolveColor(p?.popupBorderColor, resolveColor(b?.popupBorderColor, 'rgba(255,255,255,0.15)'));
  const modalBorderW = `${p?.popupBorderWidth ?? b?.popupBorderWidth ?? 1}px`;
  const modalBorderR = `${p?.popupBorderRadius ?? b?.popupBorderRadius ?? 8}px`;
  const modalPadX   = `${p?.popupPaddingX ?? b?.popupPaddingX ?? 24}px`;
  const modalPadY   = `${p?.popupPaddingY ?? b?.popupPaddingY ?? 24}px`;
  const modalFont   = p?.popupFontFamily || b?.popupFontFamily || undefined;
  const modalFontSz = (p?.popupFontSize ?? b?.popupFontSize) ? `${p?.popupFontSize ?? b?.popupFontSize}px` : undefined;
  const headingSize = p?.headingFontSize ? `${p.headingFontSize}px` : undefined;
  const headingWeight = p?.headingFontWeight || undefined;

  const toggleOnBg  = resolveColor(p?.toggleOnColor, resolveColor(b?.toggleOnColor, '#00FFC2'));
  const toggleOffBg = resolveColor(p?.toggleOffColor, resolveColor(b?.toggleOffColor, 'rgba(255,255,255,0.2)'));

  const saveBg  = saveHover
    ? (resolveColor(p?.saveButtonHoverBg, resolveColor(b?.saveButtonHoverBg, '')) || resolveColor(p?.saveButtonBg, resolveColor(b?.saveButtonBg, '#00FFC2')))
    : resolveColor(p?.saveButtonBg, resolveColor(b?.saveButtonBg, '#00FFC2'));
  const saveTxt = saveHover
    ? (resolveColor(p?.saveButtonHoverTextColor, resolveColor(b?.saveButtonHoverTextColor, '')) || resolveColor(p?.saveButtonTextColor, resolveColor(b?.saveButtonTextColor, '#1C2532')))
    : resolveColor(p?.saveButtonTextColor, resolveColor(b?.saveButtonTextColor, '#1C2532'));
  const saveBorderR = `${p?.saveButtonBorderRadius ?? b?.saveButtonBorderRadius ?? 9999}px`;

  const cancelBg  = cancelHover
    ? (resolveColor(p?.cancelButtonHoverBg, resolveColor(b?.cancelButtonHoverBg, '')) || resolveColor(p?.cancelButtonBg, resolveColor(b?.cancelButtonBg, '')))
    : resolveColor(p?.cancelButtonBg, resolveColor(b?.cancelButtonBg, ''));
  const cancelTxt = cancelHover
    ? (resolveColor(p?.cancelButtonHoverTextColor, resolveColor(b?.cancelButtonHoverTextColor, '')) || resolveColor(p?.cancelButtonTextColor, resolveColor(b?.cancelButtonTextColor, '')))
    : resolveColor(p?.cancelButtonTextColor, resolveColor(b?.cancelButtonTextColor, ''));
  const cancelBorder = cancelHover
    ? (resolveColor(p?.cancelButtonHoverBorderColor, resolveColor(b?.cancelButtonHoverBorderColor, '')) || resolveColor(p?.cancelButtonBorderColor, resolveColor(b?.cancelButtonBorderColor, 'rgba(255,255,255,0.3)')))
    : resolveColor(p?.cancelButtonBorderColor, resolveColor(b?.cancelButtonBorderColor, 'rgba(255,255,255,0.3)'));
  const cancelBorderR = `${p?.cancelButtonBorderRadius ?? b?.cancelButtonBorderRadius ?? 6}px`;

  // Content labels — from popupData with hardcoded fallbacks
  const title             = p?.popupTitle          || 'Cookie Settings';
  const essentialLabel    = p?.essentialLabel       || 'Essential';
  const essentialDesc     = p?.essentialDescription || 'Required for the site to function. Cannot be disabled.';
  const analyticsLabel    = p?.analyticsLabel       || 'Analytics';
  const analyticsDesc     = p?.analyticsDescription || 'Help us understand how visitors use the site.';
  const marketingLabel    = p?.marketingLabel       || 'Marketing';
  const marketingDesc     = p?.marketingDescription || 'Used to show you relevant advertisements.';
  const alwaysOnText      = p?.alwaysOnText         || 'Always on';
  const saveText          = p?.saveButtonText       || 'Save preferences';
  const cancelText        = p?.cancelButtonText     || 'Cancel';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: overlayBg }}
    >
      <div
        className="max-w-md w-full mx-4 space-y-4"
        style={{
          backgroundColor: modalBg,
          color: modalText,
          border: `${modalBorderW} solid ${modalBorder}`,
          borderRadius: modalBorderR,
          padding: `${modalPadY} ${modalPadX}`,
          fontFamily: modalFont,
          fontSize: modalFontSz,
        }}
      >
        <h2
          className="font-bold"
          style={{ fontSize: headingSize, fontWeight: headingWeight }}
        >
          {title}
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold text-sm">{essentialLabel}</p>
              <p className="text-xs opacity-70">{essentialDesc}</p>
            </div>
            <span className="text-xs opacity-50 shrink-0">{alwaysOnText}</span>
          </div>

          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold text-sm">{analyticsLabel}</p>
              <p className="text-xs opacity-70">{analyticsDesc}</p>
            </div>
            <button
              onClick={() => setAnalytics((v) => !v)}
              role="switch"
              aria-checked={analytics}
              className="w-10 h-5 rounded-full transition-colors shrink-0"
              style={{ backgroundColor: analytics ? toggleOnBg : toggleOffBg }}
            >
              <span className={`block w-4 h-4 bg-white rounded-full transition-transform m-0.5 ${analytics ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold text-sm">{marketingLabel}</p>
              <p className="text-xs opacity-70">{marketingDesc}</p>
            </div>
            <button
              onClick={() => setMarketing((v) => !v)}
              role="switch"
              aria-checked={marketing}
              className="w-10 h-5 rounded-full transition-colors shrink-0"
              style={{ backgroundColor: marketing ? toggleOnBg : toggleOffBg }}
            >
              <span className={`block w-4 h-4 bg-white rounded-full transition-transform m-0.5 ${marketing ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
            className="flex-1 transition-colors"
            style={{
              backgroundColor: saveBg,
              color: saveTxt,
              padding: '0.5rem',
              borderRadius: saveBorderR,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {saveText}
          </button>
          <button
            onClick={onClose}
            onMouseEnter={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            className="flex-1 py-2 text-sm transition-colors"
            style={{
              backgroundColor: cancelBg || 'transparent',
              color: cancelTxt || undefined,
              borderColor: cancelBorder,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: cancelBorderR,
              cursor: 'pointer',
            }}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}


export default function CookieSettings({ onClose, bannerData }: CookieSettingsProps) {
  const { consent, acceptSelected } = useCookieConsent();
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const [saveHover, setSaveHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);

  const handleSave = () => {
    acceptSelected({ essential: true, analytics, marketing });
    onClose();
  };

  const d = bannerData;

  const overlayBg = toRgba(d?.overlayColor, 'rgba(0,0,0,0.6)');
  const modalBg = toRgba(d?.popupBackgroundColor, 'var(--dark-green)');
  const modalText = toRgba(d?.popupTextColor, '') || undefined;
  const modalBorderColor = toRgba(d?.popupBorderColor, 'rgba(255,255,255,0.15)');
  const modalBorderWidth = d?.popupBorderWidth != null ? `${d.popupBorderWidth}px` : '1px';
  const modalBorderRadius = d?.popupBorderRadius != null ? `${d.popupBorderRadius}px` : undefined;
  const modalPaddingX = d?.popupPaddingX != null ? `${d.popupPaddingX}px` : '24px';
  const modalPaddingY = d?.popupPaddingY != null ? `${d.popupPaddingY}px` : '24px';
  const modalFontFamily = d?.popupFontFamily || undefined;
  const modalFontSize = d?.popupFontSize ? `${d.popupFontSize}px` : undefined;

  const toggleOnBg = toRgba(d?.toggleOnColor, '#00FFC2');
  const toggleOffBg = toRgba(d?.toggleOffColor, 'rgba(255,255,255,0.2)');

  const saveBg = saveHover
    ? (toRgba(d?.saveButtonHoverBg, '') || toRgba(d?.saveButtonBg, '#00FFC2'))
    : toRgba(d?.saveButtonBg, '#00FFC2');
  const saveTxt = saveHover
    ? (toRgba(d?.saveButtonHoverTextColor, '') || toRgba(d?.saveButtonTextColor, '#1C2532'))
    : toRgba(d?.saveButtonTextColor, '#1C2532');
  const saveBorderRadius = d?.saveButtonBorderRadius != null ? `${d.saveButtonBorderRadius}px` : '9999px';

  const cancelBg = cancelHover
    ? (toRgba(d?.cancelButtonHoverBg, '') || toRgba(d?.cancelButtonBg, ''))
    : toRgba(d?.cancelButtonBg, '');
  const cancelTxt = cancelHover
    ? (toRgba(d?.cancelButtonHoverTextColor, '') || toRgba(d?.cancelButtonTextColor, ''))
    : toRgba(d?.cancelButtonTextColor, '');
  const cancelBorder = cancelHover
    ? (toRgba(d?.cancelButtonHoverBorderColor, '') || toRgba(d?.cancelButtonBorderColor, 'rgba(255,255,255,0.3)'))
    : toRgba(d?.cancelButtonBorderColor, 'rgba(255,255,255,0.3)');
  const cancelBorderRadius = d?.cancelButtonBorderRadius != null ? `${d.cancelButtonBorderRadius}px` : '6px';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: overlayBg }}
    >
      <div
        className="max-w-md w-full mx-4 space-y-4"
        style={{
          backgroundColor: modalBg,
          color: modalText,
          border: `${modalBorderWidth} solid ${modalBorderColor}`,
          borderRadius: modalBorderRadius,
          padding: `${modalPaddingY} ${modalPaddingX}`,
          fontFamily: modalFontFamily,
          fontSize: modalFontSize,
        }}
      >
        <h2 className="text-lg font-bold">Cookie Settings</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold text-sm">Essential</p>
              <p className="text-xs opacity-70">Required for the site to function. Cannot be disabled.</p>
            </div>
            <span className="text-xs opacity-50 shrink-0">Always on</span>
          </div>

          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold text-sm">Analytics</p>
              <p className="text-xs opacity-70">Help us understand how visitors use the site.</p>
            </div>
            <button
              onClick={() => setAnalytics((v) => !v)}
              role="switch"
              aria-checked={analytics}
              className="w-10 h-5 rounded-full transition-colors shrink-0"
              style={{ backgroundColor: analytics ? toggleOnBg : toggleOffBg }}
            >
              <span className={`block w-4 h-4 bg-white rounded-full transition-transform m-0.5 ${analytics ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-semibold text-sm">Marketing</p>
              <p className="text-xs opacity-70">Used to show you relevant advertisements.</p>
            </div>
            <button
              onClick={() => setMarketing((v) => !v)}
              role="switch"
              aria-checked={marketing}
              className="w-10 h-5 rounded-full transition-colors shrink-0"
              style={{ backgroundColor: marketing ? toggleOnBg : toggleOffBg }}
            >
              <span className={`block w-4 h-4 bg-white rounded-full transition-transform m-0.5 ${marketing ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
            className="flex-1 transition-colors"
            style={{
              backgroundColor: saveBg,
              color: saveTxt,
              padding: '0.5rem',
              borderRadius: saveBorderRadius,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save preferences
          </button>
          <button
            onClick={onClose}
            onMouseEnter={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            className="flex-1 py-2 text-sm transition-colors"
            style={{
              backgroundColor: cancelBg || 'transparent',
              color: cancelTxt || undefined,
              borderColor: cancelBorder,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: cancelBorderRadius,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

