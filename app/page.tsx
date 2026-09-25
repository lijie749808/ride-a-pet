import { getAllEntities } from '@/lib/entity';
import { getAllArticles } from '@/lib/content';
import { HomePage } from '@/templates/HomePage';
import { siteConfig } from '@/lib/config';
import { getDatabaseDefinition } from '@/lib/database-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: siteConfig.homepage.seo.title },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.homepage.seo.title,
    description: siteConfig.description,
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: siteConfig.homepage.seo.title,
    description: siteConfig.description,
  },
  alternates: { canonical: '/' },
};

export default function Page() {
  const counts = Object.fromEntries(siteConfig.dbCategories.map(({ href }) => {
    const database = href.slice(1);
    const definition = getDatabaseDefinition(database);
    const count = definition?.status === 'draft' || definition?.status === 'hidden'
      ? 0
      : getAllEntities(database).filter((entity) => entity.status === 'published').length;
    return [database, count];
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <HomePage
        latestGuides={getAllArticles('guides').slice(0, 3)}
        latestUpdates={getAllArticles('updates').slice(0, 3)}
        latestEvents={getAllArticles('events').slice(0, 3)}
        counts={counts}
      />
    </>
  );
}
