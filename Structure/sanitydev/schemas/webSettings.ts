import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'webSettings',
  title: 'Web Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'seo', title: 'Global SEO' },
    { name: 'og', title: 'Open Graph' },
    { name: 'twitter', title: 'Twitter / X Card' },
    { name: 'analytics', title: 'Analytics & Scripts' },
  ],
  fields: [
    // ── General ──────────────────────────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      description: 'Used in og:site_name and title templates.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'general',
      description: 'The canonical root URL (e.g. https://yourdomain.com). Used for canonical tags and sitemaps.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      description: 'Small icon shown in the browser tab. PNG recommended.',
    }),
    defineField({
      name: 'appleTouchIcon',
      title: 'Apple Touch Icon',
      type: 'image',
      group: 'general',
      description: 'Icon used on iOS home screen (180×180px PNG recommended).',
    }),

    // ── Global SEO ────────────────────────────────────────────────────────────
    defineField({
      name: 'metaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Fallback description used when a page/post has no own meta description.',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO display'),
    }),
    defineField({
      name: 'keywords',
      title: 'Default Keywords',
      type: 'string',
      group: 'seo',
      description: 'Comma-separated global keywords (e.g. "saas, cms, next.js").',
    }),
    defineField({
      name: 'canonicalBase',
      title: 'Canonical Base URL',
      type: 'url',
      group: 'seo',
      description: 'Base URL prepended to page paths for canonical tags. Usually same as Site URL.',
    }),

    // ── Open Graph ────────────────────────────────────────────────────────────
    defineField({
      name: 'ogLocale',
      title: 'og:locale',
      type: 'string',
      group: 'og',
      description: 'e.g. en_US, en_GB, es_ES',
      initialValue: 'en_US',
    }),
    defineField({
      name: 'ogType',
      title: 'og:type (default)',
      type: 'string',
      group: 'og',
      description: 'Default OG type. Usually "website".',
      initialValue: 'website',
      options: {
        list: [
          { title: 'website', value: 'website' },
          { title: 'article', value: 'article' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      group: 'og',
      description: 'Fallback image for social sharing. Recommended 1200×630px.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
        defineField({ name: 'width', type: 'number', title: 'Image width (px)', initialValue: 1200 }),
        defineField({ name: 'height', type: 'number', title: 'Image height (px)', initialValue: 630 }),
      ],
    }),

    // ── Twitter / X Card ─────────────────────────────────────────────────────
    defineField({
      name: 'twitterCard',
      title: 'twitter:card',
      type: 'string',
      group: 'twitter',
      initialValue: 'summary_large_image',
      options: {
        list: [
          { title: 'Summary (small image)', value: 'summary' },
          { title: 'Summary Large Image', value: 'summary_large_image' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'twitterSite',
      title: 'twitter:site',
      type: 'string',
      group: 'twitter',
      description: 'Twitter/X handle of the website (e.g. @yoursite)',
    }),
    defineField({
      name: 'twitterCreator',
      title: 'twitter:creator',
      type: 'string',
      group: 'twitter',
      description: 'Twitter/X handle of the content creator (e.g. @author)',
    }),

    // ── Analytics & Scripts ───────────────────────────────────────────────────
    defineField({
      name: 'gaCode',
      title: 'Google Analytics / Tag Manager Code',
      type: 'text',
      rows: 8,
      group: 'analytics',
      description: 'Paste the GA or GTM snippet (can include <script> tags). Injected into <head>.',
    }),
  ],
})
