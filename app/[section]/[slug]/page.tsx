import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';
import { ArticleTemplate } from '@/templates/ArticleTemplate/Article';
import { EntityDetail } from '@/templates/EntityTemplate/EntityDetail';
import { UnderConstruction } from '@/components/UnderConstruction';
import { getArticleBySlug, getArticleSlugs } from '@/lib/content';
import { getEntityBySlug, getEntitySlugs } from '@/lib/entity';
import {
  getArticleSectionDefinition,
  getArticleSectionSlugs,
  type ArticleSectionSlug,
} from '@/lib/article-config';
import { getDatabaseDefinition, getDatabaseSlugs } from '@/lib/database-config';
import {
  buildArticleJsonLd,
  buildEntityJsonLd,
  generateArticleMetadata,
  generateEntityMetadata,
} from '@/lib/seo';

interface SectionDetailPageProps {
  params: Promise<{ section: string; slug: string }>;
}

export function generateStaticParams() {
  const databaseParams = getDatabaseSlugs().flatMap((section) => (
    getEntitySlugs(section).map((slug) => ({ section, slug }))
  ));
  const articleParams = getArticleSectionSlugs().flatMap((section) => (
    getArticleSlugs(section).map((slug) => ({ section, slug }))
  ));

  return [...databaseParams, ...articleParams];
}

export async function generateMetadata({
  params,
}: SectionDetailPageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const database = getDatabaseDefinition(section);
  if (database) {
    const entity = getEntityBySlug(section, slug);
    if (database.status === 'hidden') return { robots: { index: false, follow: false } };
    if (database.status === 'draft') {
      return {
        title: entity?.name ?? database.label,
        description: entity?.description ?? database.description,
        robots: { index: false, follow: false },
      };
    }
    if (entity?.status === 'hidden') return { robots: { index: false, follow: false } };
    if (entity?.status === 'draft') {
      return {
        title: entity.name,
        description: entity.description,
        robots: { index: false, follow: false },
      };
    }
    return entity
      ? generateEntityMetadata(
          entity.name,
          entity.description,
          `/${section}/${slug}`,
          entity.image,
        )
      : {};
  }

  const articleSection = getArticleSectionDefinition(section);
  const article = articleSection
    ? getArticleBySlug(section as ArticleSectionSlug, slug)
    : null;
  if (article?.meta.status === 'hidden') return { robots: { index: false, follow: false } };
  if (article?.meta.status === 'draft') {
    return {
      title: article.meta.title,
      description: article.meta.description,
      robots: { index: false, follow: false },
    };
  }
  return article
    ? generateArticleMetadata(
        article.meta.title,
        article.meta.description,
        `/${section}/${slug}`,
        { image: article.meta.image, date: article.meta.date },
      )
    : {};
}

export default async function SectionDetailPage({
  params,
}: SectionDetailPageProps) {
  const { section, slug } = await params;
  const database = getDatabaseDefinition(section);

  if (database) {
    const entity = getEntityBySlug(section, slug);
    if (database.status === 'hidden') notFound();
    if (database.status === 'draft') {
      return (
        <UnderConstruction
          title={entity?.name ?? database.label}
          section={{ label: database.label, href: `/${section}` }}
        />
      );
    }
    if (!entity || entity.status === 'hidden') notFound();
    if (entity.status === 'draft') {
      return (
        <UnderConstruction
          title={entity.name}
          section={{ label: database.label, href: `/${section}` }}
        />
      );
    }

    const relatedSection = database.detail.sections.find(
      (item) => item.type === 'related',
    );
    const relatedIds = relatedSection
      ? entity[relatedSection.field]
      : undefined;
    const relatedDatabase = relatedSection?.type === 'related'
      ? relatedSection.database ?? section
      : section;
    const relatedPages = Array.isArray(relatedIds)
      ? relatedIds.flatMap((id) => {
          const related = getEntityBySlug(relatedDatabase, String(id));
          return related && related.status !== 'hidden'
            ? [{
                id: related.id,
                name: related.name,
                image: related.image,
                href: `/${relatedDatabase}/${related.id}`,
              }]
            : [];
        })
      : [];
    const jsonLd = buildEntityJsonLd({
      name: entity.name,
      description: entity.description,
      slug,
      entityType: section,
      image: entity.image,
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EntityDetail
          entity={entity}
          database={database}
          relatedPages={relatedPages}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: database.label, href: `/${section}` },
            { label: entity.name },
          ]}
        />
      </>
    );
  }

  const articleSection = getArticleSectionDefinition(section);
  const article = articleSection
    ? getArticleBySlug(section as ArticleSectionSlug, slug)
    : null;
  if (!articleSection || !article) notFound();
  if (article.meta.status === 'hidden') notFound();
  if (article.meta.status === 'draft') {
    return (
      <UnderConstruction
        title={article.meta.title}
        section={{ label: articleSection.label, href: `/${section}` }}
      />
    );
  }

  const jsonLd = buildArticleJsonLd({
    title: article.meta.title,
    description: article.meta.description,
    slug,
    category: section,
    date: article.meta.date,
    author: article.meta.author,
    image: article.meta.image,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleTemplate
        meta={article.meta}
        section={{ label: articleSection.label, href: `/${section}` }}
        content={
          <MDXRemote
            source={article.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        }
      />
    </>
  );
}
