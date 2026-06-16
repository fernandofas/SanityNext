'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface SlideData {
  image?: { asset?: { _id?: string; url?: string; metadata?: { dimensions?: { width?: number; height?: number } } } };
  altText?: string;
  heading?: string;
  subheading?: string;
  body?: string;
  linkType?: string;
  externalUrl?: string;
  internalLink?: { slug?: { current?: string } };
  linkLabel?: string;
  textPosition?: string;
}

interface SliderData {
  slides?: SlideData[];
  fullWidth?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  direction?: 'horizontal' | 'vertical';
  swipe?: boolean;
  keyboardControl?: boolean;
  transitionType?: string;
  transitionDuration?: number;
  transitionEasing?: string;
  heightType?: 'vh' | 'px' | 'auto';
  heightValue?: number;
  objectFit?: string;
  borderRadius?: number;
  maxWidth?: number;
  showArrows?: boolean;
  arrowBackgroundColor?: string;
  arrowColor?: string;
  arrowHoverBackgroundColor?: string;
  arrowSize?: number;
  arrowBorderRadius?: number;
  showDots?: boolean;
  dotColor?: string;
  dotActiveColor?: string;
  dotSize?: number;
  dotShape?: string;
  overlayColor?: string;
  headingColor?: string;
  headingFontSize?: number;
  headingFontWeight?: string;
  subheadingColor?: string;
  subheadingFontSize?: number;
  bodyTextColor?: string;
  bodyTextFontSize?: number;
  linkBtnBackgroundColor?: string;
  linkBtnTextColor?: string;
  linkBtnBorderRadius?: number;
  textPaddingX?: number;
  textPaddingY?: number;
  containerPaddingTop?: number;
  containerPaddingBottom?: number;
}

// Color is now a plain CSS string (e.g. "#fff", "rgba(0,0,0,0.5)")
function resolveColor(val: any, fallback?: string): string | undefined {
  if (!val) return fallback;
  if (typeof val === 'string') return val || fallback;
  // Legacy {rgb,alpha} shape from older data
  if (val?.rgb) {
    const { r, g, b } = val.rgb;
    return `rgba(${r},${g},${b},${val.alpha ?? 1})`;
  }
  return fallback;
}

function textPositionToCSS(pos?: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    'center': { alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
    'top-left': { alignItems: 'flex-start', justifyContent: 'flex-start', textAlign: 'left' },
    'top-center': { alignItems: 'flex-start', justifyContent: 'center', textAlign: 'center' },
    'top-right': { alignItems: 'flex-start', justifyContent: 'flex-end', textAlign: 'right' },
    'middle-left': { alignItems: 'center', justifyContent: 'flex-start', textAlign: 'left' },
    'middle-right': { alignItems: 'center', justifyContent: 'flex-end', textAlign: 'right' },
    'bottom-left': { alignItems: 'flex-end', justifyContent: 'flex-start', textAlign: 'left' },
    'bottom-center': { alignItems: 'flex-end', justifyContent: 'center', textAlign: 'center' },
    'bottom-right': { alignItems: 'flex-end', justifyContent: 'flex-end', textAlign: 'right' },
  };
  return map[pos || 'center'] || map['center'];
}

export default function SliderBlock({ data }: { data: SliderData }) {
  const slides = data?.slides || [];
  const [current, setCurrent] = useState(0);
  const [arrowHover, setArrowHover] = useState<'prev' | 'next' | null>(null);
  const isHovering = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const goTo = useCallback((index: number) => {
    if (total === 0) return;
    const loop = data?.loop !== false;
    if (!loop) {
      setCurrent(Math.max(0, Math.min(index, total - 1)));
    } else {
      setCurrent(((index % total) + total) % total);
    }
  }, [total, data?.loop]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (!data?.autoplay || total <= 1) return;
    const delay = data?.autoplayDelay ?? 4000;
    const interval = setInterval(() => {
      if (!isHovering.current) next();
    }, delay);
    return () => clearInterval(interval);
  }, [data?.autoplay, data?.autoplayDelay, next, total]);

  // Keyboard
  useEffect(() => {
    if (!data?.keyboardControl) return;
    const isVertical = data?.direction === 'vertical';
    const handler = (e: KeyboardEvent) => {
      if (isVertical) {
        if (e.key === 'ArrowUp') prev();
        if (e.key === 'ArrowDown') next();
      } else {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [data?.keyboardControl, data?.direction, prev, next]);

  // Touch — native listener with passive:true to avoid console violations
  useEffect(() => {
    if (!data?.swipe) return;
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    const isVertical = data?.direction === 'vertical';

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;
      const threshold = 40;
      if (isVertical) {
        if (dy > threshold) next();
        else if (dy < -threshold) prev();
      } else {
        if (dx > threshold) next();
        else if (dx < -threshold) prev();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [data?.swipe, data?.direction, next, prev]);

  if (total === 0) return null;

  const heightType = data?.heightType || 'vh';
  const heightValue = data?.heightValue ?? 60;
  const heightCSS = heightType === 'auto' ? 'auto' : `${heightValue}${heightType}`;
  const transitionDuration = data?.transitionDuration ?? 500;
  const easing = data?.transitionEasing || 'ease-in-out';
  const transitionType = data?.transitionType || 'slide';
  const isVertical = data?.direction === 'vertical';
  const objectFit = (data?.objectFit || 'cover') as React.CSSProperties['objectFit'];

  // Responsive arrow size — cap at 32px on small screens via CSS clamp
  const arrowSizeVal = data?.arrowSize ?? 40;
  const arrowSize = `clamp(28px, ${arrowSizeVal}px, ${arrowSizeVal}px)`;
  const arrowBorderRadius = data?.arrowBorderRadius ?? 9999;

  // Dots
  const dotSize = data?.dotSize ?? 10;
  const dotShape = data?.dotShape || 'circle';
  const dotBorderRadius = dotShape === 'dash' ? '2px' : dotShape === 'square' ? '0' : '50%';
  const dotWidth = dotShape === 'dash' ? `${dotSize * 2.5}px` : `${dotSize}px`;

  // Full-width breakout: negative margins to escape container padding
  const fullWidthStyle: React.CSSProperties = data?.fullWidth
    ? { marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', width: '100vw', maxWidth: '100vw' }
    : {
        maxWidth: typeof data?.maxWidth === 'number' ? `${data.maxWidth}px` : undefined,
        margin: typeof data?.maxWidth === 'number' ? '0 auto' : undefined,
      };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: data?.fullWidth ? '100vw' : '100%',
    height: heightCSS,
    borderRadius: typeof data?.borderRadius === 'number' ? `${data.borderRadius}px` : undefined,
    ...fullWidthStyle,
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
    const isCurrent = index === current;
    const base: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };

    if (transitionType === 'fade') {
      return { ...base, opacity: isCurrent ? 1 : 0, transition: `opacity ${transitionDuration}ms ${easing}`, zIndex: isCurrent ? 1 : 0 };
    }
    if (transitionType === 'zoom-in') {
      return { ...base, opacity: isCurrent ? 1 : 0, transform: isCurrent ? 'scale(1)' : 'scale(1.05)', transition: `opacity ${transitionDuration}ms ${easing}, transform ${transitionDuration}ms ${easing}`, zIndex: isCurrent ? 1 : 0 };
    }
    if (transitionType === 'zoom-out') {
      return { ...base, opacity: isCurrent ? 1 : 0, transform: isCurrent ? 'scale(1)' : 'scale(0.95)', transition: `opacity ${transitionDuration}ms ${easing}, transform ${transitionDuration}ms ${easing}`, zIndex: isCurrent ? 1 : 0 };
    }
    if (transitionType === 'flip-h') {
      return { ...base, opacity: isCurrent ? 1 : 0, transform: isCurrent ? 'rotateY(0deg)' : 'rotateY(90deg)', transition: `opacity ${transitionDuration}ms ${easing}, transform ${transitionDuration}ms ${easing}`, zIndex: isCurrent ? 1 : 0, backfaceVisibility: 'hidden' };
    }
    if (transitionType === 'flip-v') {
      return { ...base, opacity: isCurrent ? 1 : 0, transform: isCurrent ? 'rotateX(0deg)' : 'rotateX(90deg)', transition: `opacity ${transitionDuration}ms ${easing}, transform ${transitionDuration}ms ${easing}`, zIndex: isCurrent ? 1 : 0, backfaceVisibility: 'hidden' };
    }

    // Default: slide
    const offset = index - current;
    const axis = isVertical ? 'translateY' : 'translateX';
    return { ...base, transform: `${axis}(${offset * 100}%)`, transition: `transform ${transitionDuration}ms ${easing}`, zIndex: 0 };
  };

  // Responsive heading font size: scale down proportionally on mobile
  const headingFs = data?.headingFontSize ?? 36;
  const subheadingFs = data?.subheadingFontSize ?? 20;
  const bodyFs = data?.bodyTextFontSize ?? 16;

  const outerStyle: React.CSSProperties = {
    paddingTop: data?.containerPaddingTop != null ? `${data.containerPaddingTop}px` : undefined,
    paddingBottom: data?.containerPaddingBottom != null ? `${data.containerPaddingBottom}px` : undefined,
  };

  return (
    <div style={outerStyle}>
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseEnter={() => { if (data?.pauseOnHover) isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; }}
    >
      {/* Slides */}
      {slides.map((slide, i) => {
        const imgUrl = slide?.image?.asset?.url;
        const posCSS = textPositionToCSS(slide?.textPosition);
        const hasCopy = slide?.heading || slide?.subheading || slide?.body || slide?.linkLabel;
        const slideHref = slide?.linkType === 'external' ? slide?.externalUrl : slide?.linkType === 'internal' && slide?.internalLink?.slug?.current ? `/${slide.internalLink.slug.current}` : undefined;

        return (
          <div key={i} style={getSlideStyle(i)}>
            {imgUrl && (
              <Image
                src={imgUrl}
                alt={slide?.altText || slide?.heading || ''}
                fill
                style={{ objectFit }}
                sizes="100vw"
                priority={i === 0}
              />
            )}
            {/* Overlay */}
            {resolveColor(data?.overlayColor) && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: resolveColor(data?.overlayColor), zIndex: 1 }} />
            )}
            {/* Text */}
            {hasCopy && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column',
                padding: `clamp(12px, ${data?.textPaddingY ?? 24}px, ${data?.textPaddingY ?? 24}px) clamp(12px, ${data?.textPaddingX ?? 24}px, ${data?.textPaddingX ?? 24}px)`,
                ...posCSS,
              }}>
                <div style={{ maxWidth: '90%' }}>
                  {slide?.heading && (
                    <p style={{ margin: 0, color: resolveColor(data?.headingColor) || '#fff', fontSize: `clamp(18px, ${headingFs}px, ${headingFs}px)`, fontWeight: data?.headingFontWeight || '700', lineHeight: 1.2 }}>{slide.heading}</p>
                  )}
                  {slide?.subheading && (
                    <p style={{ margin: '6px 0 0', color: resolveColor(data?.subheadingColor) || '#eee', fontSize: `clamp(14px, ${subheadingFs}px, ${subheadingFs}px)` }}>{slide.subheading}</p>
                  )}
                  {slide?.body && (
                    <p style={{ margin: '6px 0 0', color: resolveColor(data?.bodyTextColor) || '#ccc', fontSize: `clamp(12px, ${bodyFs}px, ${bodyFs}px)` }}>{slide.body}</p>
                  )}
                  {slide?.linkLabel && slideHref && (
                    <a href={slideHref} style={{ display: 'inline-block', marginTop: '12px', padding: '8px 20px', borderRadius: `${data?.linkBtnBorderRadius ?? 9999}px`, backgroundColor: resolveColor(data?.linkBtnBackgroundColor) || 'rgba(255,255,255,0.2)', color: resolveColor(data?.linkBtnTextColor) || '#fff', textDecoration: 'none', fontSize: 'clamp(12px, 14px, 14px)' }}>
                      {slide.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Prev arrow */}
      {data?.showArrows !== false && total > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            onMouseEnter={() => setArrowHover('prev')}
            onMouseLeave={() => setArrowHover(null)}
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              left: '8px',
              transform: 'translateY(-50%)',
              width: arrowSize,
              height: arrowSize,
              minWidth: '28px',
              minHeight: '28px',
              borderRadius: `${arrowBorderRadius}px`,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (arrowHover === 'prev' ? resolveColor(data?.arrowHoverBackgroundColor) : null) || resolveColor(data?.arrowBackgroundColor) || 'rgba(0,0,0,0.4)',
              color: resolveColor(data?.arrowColor) || '#fff',
              transition: 'background-color 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            onMouseEnter={() => setArrowHover('next')}
            onMouseLeave={() => setArrowHover(null)}
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              right: '8px',
              transform: 'translateY(-50%)',
              width: arrowSize,
              height: arrowSize,
              minWidth: '28px',
              minHeight: '28px',
              borderRadius: `${arrowBorderRadius}px`,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (arrowHover === 'next' ? resolveColor(data?.arrowHoverBackgroundColor) : null) || resolveColor(data?.arrowBackgroundColor) || 'rgba(0,0,0,0.4)',
              color: resolveColor(data?.arrowColor) || '#fff',
              transition: 'background-color 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots — inside the slider, 10px from bottom */}
      {data?.showDots !== false && total > 1 && (
        <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '0 8px' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                padding: 0,
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                width: i === current ? (dotShape === 'dash' ? `${dotSize * 3}px` : dotWidth) : dotWidth,
                height: `${dotSize}px`,
                borderRadius: dotBorderRadius,
                backgroundColor: i === current ? (resolveColor(data?.dotActiveColor) || '#fff') : (resolveColor(data?.dotColor) || 'rgba(255,255,255,0.5)'),
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
