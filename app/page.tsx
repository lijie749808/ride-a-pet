import { getAllEntities } from '@/lib/entity';
import { getAllArticles } from '@/lib/content';
import { HomePage } from '@/templates/HomePage';
import { siteConfig } from '@/lib/config';
import type { Item } from '@/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
  },
  alternates: { canonical: '/' },
};

export default function Page() {
  const allItems = getAllEntities<Item>('items');
  const allGuides = getAllArticles('guides');

  const counts: Record<string, number> = {
    items: allItems.length,
    guides: allGuides.length,
  };

  return (
    <HomePage
      recentItems={allItems.slice(0, 4)}
      latestGuides={allGuides.slice(0, 4)}
      counts={counts}
    />
  );
}
