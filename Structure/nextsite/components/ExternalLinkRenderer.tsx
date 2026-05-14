'use client';

import React from 'react';

interface ExternalLinkRendererProps {
  value: {
    href: string;
    openInNewTab?: boolean;
  };
  children?: React.ReactNode;
}

export default function ExternalLinkRenderer({ value, children }: ExternalLinkRendererProps) {
  const { href, openInNewTab } = value;
  return (
    <a
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
