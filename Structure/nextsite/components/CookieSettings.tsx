'use client';

import React, { useState } from 'react';
import { useCookieConsent } from '../contexts/CookieConsentContext';

interface RgbaColor { rgb?: { r: number; g: number; b: number }; alpha?: number }

interface CookieSettingsProps {
  onClose: () => void;
  bannerData?: any;
}

function toRgba(color?: RgbaColor, fallback = ''): string {
  if (!color?.rgb) return fallback;
  const { r, g, b } = color.rgb;
  return `rgba(${r},${g},${b},${color.alpha ?? 1})`;
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

