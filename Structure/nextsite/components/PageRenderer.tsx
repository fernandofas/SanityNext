'use client';

import React, { ElementType } from 'react';
import { PortableText } from '@portabletext/react';
import ContactForm from './ContactForm';
import SliderBlock from './SliderBlock';
import portableTextComponents from './pte';
import { urlFor } from '../lib/sanity';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toRgba(color: any): string | undefined {
  if (!color?.rgb) return undefined;
  const { r, g, b } = color.rgb;
  const a = color.alpha ?? 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getSectionBg(item: any): React.CSSProperties {
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

// ---------------------------------------------------------------------------
// Column-object renderer (used by columnBack sections)
// A "column object" has: backgroundColor, textColor, backgroundImage, heading, title, content[]
// ---------------------------------------------------------------------------

function ColumnObject({ col }: { col: any }) {
  const Tag = col.heading ? (col.heading as ElementType) : null;
  return (
    <div
      className="bradious containerover"
      style={{ ...getSectionBg(col), color: toRgba(col.textColor), height: '100%' }}
    >
      <div className="containerover padtop padbot padlef padrig">
        {Tag && <Tag>{col.title}</Tag>}
        {Array.isArray(col.content) && col.content.length > 0 && (
          <PortableText value={col.content} components={portableTextComponents} />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// columnSection renderer â€” columns are flat PortableText arrays (column0â€“column4)
// ---------------------------------------------------------------------------

function ColumnSectionBlock({ section }: { section: any }) {
  const layout = section.columnLayout || '1';
  let columns: any[];
  if (layout === '1') {
    columns = [section.column0 || []];
  } else if (layout === '2') {
    columns = [section.column1 || [], section.column2 || []];
  } else if (layout === '3') {
    columns = [section.column1 || [], section.column2 || [], section.column3 || []];
  } else if (layout === '4') {
    columns = [section.column1 || [], section.column2 || [], section.column3 || [], section.column4 || []];
  } else {
    columns = [section.column0 || []];
  }

  const textColor = toRgba(section.textColor);

  return (
    <section style={{ ...getSectionBg(section), color: textColor || undefined }}>
      <div className={`padcont ${gridClass(columns.length)} gap-6`}>
        {columns.map((col, i) => (
          <div key={i} className="padtop padbot">
            {Array.isArray(col) && col.length > 0 && (
              <PortableText value={col} components={portableTextComponents} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// columnBack renderer â€” columnContent[] array of column objects
// ---------------------------------------------------------------------------

function ColumnBackBlock({ section }: { section: any }) {
  const cols: any[] = section.columnContent || [];
  const numCols = Math.max(1, Math.min(4, parseInt(section.columnLayout, 10) || 1));

  return (
    <section style={getSectionBg(section)}>
      <div className={`padcont ${gridClass(numCols)} gap-6`}>
        {cols.map((col: any, i: number) => (
          <ColumnObject key={col._key || i} col={col} />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Nested "sections" document renderer (referenced from within columnBack content)
// A sections document has content[] of columnSection items
// ---------------------------------------------------------------------------

function NestedSectionsDoc({ value }: { value: any }) {
  if (!Array.isArray(value?.content)) return null;
  return (
    <>
      {value.content.map((cs: any, i: number) => (
        <ColumnSectionBlock key={cs._key || i} section={cs} />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Page-level form section
// ---------------------------------------------------------------------------

function FormSection({ section }: { section: any }) {
  return (
    <section>
      <div className="padcont padtop padbot">
        <div className="formamaxwidth mx-auto">
          <ContactForm
            fields={section.fields || []}
            submitText={section.submitText}
            emailTo={section.emailTo}
            submitBgColor={section.submitBgColor}
            submitTextColor={section.submitTextColor}
            submithoverBackgroundColor={section.submithoverBackgroundColor}
            submithoverTextColor={section.submithoverTextColor}
            formStyle={section.formStyle}
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page-level slider section
// ---------------------------------------------------------------------------

function SliderSection({ section }: { section: any }) {
  return (
    <section style={{ position: 'relative', overflow: 'visible' }}>
      <SliderBlock data={section} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main PageRenderer
// ---------------------------------------------------------------------------

interface PageRendererProps {
  page: any;
}

export default function PageRenderer({ page }: PageRendererProps) {
  if (!page) return <div className="padcont padtop padbot"><p>Page not found.</p></div>;

  return (
    <div>
      {(page.sections || []).map((section: any, idx: number) => {
        const key = section._key || idx;

        if (section._type === 'columnBack') {
          return <ColumnBackBlock key={key} section={section} />;
        }

        if (section._type === 'columnSection') {
          return <ColumnSectionBlock key={key} section={section} />;
        }

        if (section._type === 'form') {
          return <FormSection key={key} section={section} />;
        }

        if (section._type === 'slider') {
          return <SliderSection key={key} section={section} />;
        }

        // Unknown section type â€” skip silently
        return null;
      })}
    </div>
  );
}

// Export helpers so pte.tsx can reuse them for nested sections
export { NestedSectionsDoc };
