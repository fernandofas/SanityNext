import React from 'react';

const Svg = ({children, ...props}) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="#535353"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const AlignLeftIcon = (props) => (
  <Svg {...props}>
    {/* left-aligned long, short, long */}
    <line x1="4"  y1="6"  x2="20" y2="6" />
    <line x1="4"  y1="12" x2="16" y2="12" />
    <line x1="4"  y1="18" x2="20" y2="18" />
  </Svg>
);

export const AlignCenterIcon = (props) => (
  <Svg {...props}>
    {/* centered long, shorter, long */}
    <line x1="4"  y1="6"  x2="20" y2="6" />
    <line x1="6"  y1="12" x2="18" y2="12" />
    <line x1="4"  y1="18" x2="20" y2="18" />
  </Svg>
);

export const AlignRightIcon = (props) => (
  <Svg {...props}>
    {/* right-aligned long, shorter, long */}
    <line x1="4"  y1="6"  x2="20" y2="6" />
    <line x1="8"  y1="12" x2="20" y2="12" />
    <line x1="4"  y1="18" x2="20" y2="18" />
  </Svg>
);

export const AlignJustifyIcon = (props) => (
  <Svg {...props}>
    {/* all lines full width */}
    <line x1="4"  y1="6"  x2="20" y2="6" />
    <line x1="4"  y1="12" x2="20" y2="12" />
    <line x1="4"  y1="18" x2="20" y2="18" />
  </Svg>
);
