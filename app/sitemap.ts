import type { MetadataRoute } from 'next';
import { getEntityBySlug, getEntitySlugs } from '@/lib/entity';
import { getArticleBySlug, getArticleSlugs } from '@/lib/content';
import { siteConfig } from '@/lib/config';
import { getArticleSectionSlugs } from '@/lib/article-config';
import { getDatabaseDefinition, getDatabaseSlugs } from '@/lib/database-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
  ];

  const articleSectionRoutes: MetadataRoute.Sitemap = getArticleSectionSlugs().flatMap((section) => {
    const article = getArticleBySlug(section, 'index');
    return article?.meta.status === 'published' ? [{
      url: `${base}/${section}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: section === 'guides' ? 0.9 : 0.8,
    }] : [];
  });

  const databaseRoutes: MetadataRoute.Sitemap = getDatabaseSlugs().flatMap((database) => (
    getDatabaseDefinition(database)?.status === 'draft' ? [] : [{
      url: `${base}/${database}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }]
  ));

  const entityRoutes: MetadataRoute.Sitemap = getDatabaseSlugs().flatMap((database) => (
    getDatabaseDefinition(database)?.status === 'draft' ? [] : getEntitySlugs(database).flatMap((slug) => (
      getEntityBySlug(database, slug)?.status === 'published' ? [{
        url: `${base}/${database}/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }] : []
    ))
  ));

  // Dynamic article pages
  const articleRoutes: MetadataRoute.Sitemap = getArticleSectionSlugs().flatMap((section) => (
    getArticleSlugs(section).flatMap((slug) => (
      getArticleBySlug(section, slug)?.meta.status === 'published' ? [{
        url: `${base}/${section}/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }] : []
    ))
  ));

  return [
    ...staticRoutes,
    ...articleSectionRoutes,
    ...databaseRoutes,
    ...entityRoutes,
    ...articleRoutes,
  ];
}
