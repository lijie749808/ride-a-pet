import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';
import { ArticleTemplate } from '@/templates/ArticleTemplate/Article';
import { EntityList } from '@/templates/EntityTemplate/EntityList';
import { UnderConstruction } from '@/components/UnderConstruction';
import { getArticleBySlug } from '@/lib/content';
import { getAllEntities } from '@/lib/entity';
import {
  getArticleSectionDefinition,
  getArticleSectionSlugs,
  type ArticleSectionSlug,
} from '@/lib/article-config';
import { getDatabaseDefinition, getDatabaseSlugs } from '@/lib/database-config';
import { generateEntityListMetadata } from '@/lib/seo';

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams() {
  return [
    ...getDatabaseSlugs(),
    ...getArticleSectionSlugs(),
  ].map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const database = getDatabaseDefinition(section);
  if (database) {
    if (database.status === 'hidden') return { robots: { index: false, follow: false } };
    if (database.status === 'draft') {
      return {
        title: database.label,
        description: database.description,
        robots: { index: false, follow: false },
      };
    }
    return generateEntityListMetadata(
      database.label,
      database.description,
      `/${section}`,
    );
  }

  const articleSection = getArticleSectionDefinition(section);
  const article = articleSection
    ? getArticleBySlug(section as ArticleSectionSlug, 'index')
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
    ? generateEntityListMetadata(
        article.meta.title,
        article.meta.description,
        `/${section}`,
      )
    : {};
}

export default async function SectionListPage({ params }: SectionPageProps) {
  const { section } = await params;
  const database = getDatabaseDefinition(section);

  if (database) {
    if (database.status === 'hidden') notFound();
    if (database.status === 'draft') {
      return <UnderConstruction title={database.label} />;
    }
    return (
      <EntityList
        title={database.label}
        description={database.description}
        database={section}
        entities={getAllEntities(section)}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: database.label }]}
        card={database.card}
        categoryField={database.category?.field}
        categoryLabel={database.category?.label}
        categoryColors={database.category?.colors}
      />
    );
  }

  const articleSection = getArticleSectionDefinition(section);
  const article = articleSection
    ? getArticleBySlug(section as ArticleSectionSlug, 'index')
    : null;
  if (!articleSection || !article) notFound();
  if (article.meta.status === 'hidden') notFound();
  if (article.meta.status === 'draft') {
    return <UnderConstruction title={article.meta.title} />;
  }

  return (
    <ArticleTemplate
      meta={article.meta}
      breadcrumbLabel={articleSection.label}
      content={
        <MDXRemote
          source={article.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      }
    />
  );
}
