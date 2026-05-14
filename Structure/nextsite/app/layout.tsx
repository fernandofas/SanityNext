import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Providers from '../components/Providers';
import AuthModal from '../components/AuthModal';
import { CookieBanner } from '../components/CookieBanner';
import { sanityClient } from '../lib/sanity';
import {
  webSettingsQuery,
  globalSettingsQuery,
  headerMenuQuery,
  headerSettingsQuery,
  footerMenusQuery,
  footerSettingsQuery,
  footerContentQuery,
  cookieBannerQuery,
} from '../sanity/queries';
import { buildMetadata } from '../lib/seo';
import { OrganizationJsonLd, WebSiteJsonLd } from '../components/JsonLd';

function toRgba(c: any): string | undefined {
  if (!c?.rgb) return undefined;
  const { r, g, b } = c.rgb;
  return `rgba(${r},${g},${b},${c.alpha ?? 1})`;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityClient.fetch(webSettingsQuery).catch(() => null);
  const base = buildMetadata({ settings });
  return {
    ...base,
    title: {
      default: settings?.siteName || 'SanityNext',
      template: `%s | ${settings?.siteName || 'SanityNext'}`,
    },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch all layout data server-side — no CORS issues
  const [settings, globalSettings, headerData, headerSettings, footerMenus, footerSettings, footerContent, cookieBannerData] = await Promise.all([
    sanityClient.fetch(webSettingsQuery).catch(() => null),
    sanityClient.fetch(globalSettingsQuery).catch(() => null),
    sanityClient.fetch(headerMenuQuery).catch(() => null),
    sanityClient.fetch(headerSettingsQuery).catch(() => null),
    sanityClient.fetch(footerMenusQuery).catch(() => []),
    sanityClient.fetch(footerSettingsQuery).catch(() => null),
    sanityClient.fetch(footerContentQuery).catch(() => null),
    sanityClient.fetch(cookieBannerQuery).catch(() => null),
  ]);

  const gaCode: string | null = settings?.gaCode || null;
  const bodyMaxWidth = typeof globalSettings?.bodyMaxWidth === 'number' ? globalSettings.bodyMaxWidth : 1400;
  const bgImageUrl: string | undefined = globalSettings?.bodyBackgroundImage?.asset?.url;

  const bodyStyle: React.CSSProperties = {
    ['--body-max-width' as any]: `${bodyMaxWidth}px`,
    ['--global-font-family' as any]: globalSettings?.fontFamily || undefined,
    ['--global-font-size' as any]: globalSettings?.fontSizeBase ? `${globalSettings.fontSizeBase}px` : undefined,
    ['--global-line-height' as any]: globalSettings?.lineHeight ?? undefined,
    ['--global-letter-spacing' as any]: globalSettings?.letterSpacing != null ? `${globalSettings.letterSpacing}px` : undefined,
    backgroundColor: toRgba(globalSettings?.bodyBackgroundColor) ?? undefined,
    backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
    backgroundSize: bgImageUrl ? (globalSettings?.backgroundSize ?? 'cover') : undefined,
    backgroundRepeat: bgImageUrl ? (globalSettings?.backgroundRepeat ?? 'no-repeat') : undefined,
    backgroundPosition: bgImageUrl ? (globalSettings?.backgroundPosition ?? 'center') : undefined,
    marginTop: globalSettings?.bodyMarginTop != null ? `${globalSettings.bodyMarginTop}px` : undefined,
    marginBottom: globalSettings?.bodyMarginBottom != null ? `${globalSettings.bodyMarginBottom}px` : undefined,
    marginLeft: globalSettings?.bodyMarginLeft != null ? `${globalSettings.bodyMarginLeft}px` : undefined,
    marginRight: globalSettings?.bodyMarginRight != null ? `${globalSettings.bodyMarginRight}px` : undefined,
    paddingTop: globalSettings?.bodyPaddingTop != null ? `${globalSettings.bodyPaddingTop}px` : undefined,
    paddingBottom: globalSettings?.bodyPaddingBottom != null ? `${globalSettings.bodyPaddingBottom}px` : undefined,
    paddingLeft: globalSettings?.bodyPaddingLeft != null ? `${globalSettings.bodyPaddingLeft}px` : undefined,
    paddingRight: globalSettings?.bodyPaddingRight != null ? `${globalSettings.bodyPaddingRight}px` : undefined,
  };

  return (
    <html lang="en">
      <head>
        {gaCode && (
          <script dangerouslySetInnerHTML={{ __html: gaCode }} />
        )}
        {settings?.siteName && settings?.siteUrl && (
          <>
            <OrganizationJsonLd
              name={settings.siteName}
              url={settings.siteUrl}
              logo={settings.favicon?.asset?.url}
              description={settings.metaDescription}
            />
            <WebSiteJsonLd name={settings.siteName} url={settings.siteUrl} />
          </>
        )}
      </head>
      <body style={bodyStyle}>
        <Providers>
          <Header menuItems={headerData?.items || []} headerSettings={headerSettings} />
          <main>{children}</main>
          <Footer menus={footerMenus || []} settings={footerSettings} footerContent={footerContent} />
          <AuthModal />
          <CookieBanner data={cookieBannerData} />
        </Providers>
      </body>
    </html>
  );
}

