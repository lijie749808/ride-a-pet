import type { Metadata } from 'next';
import { siteConfig } from './config';

/** Metadata for an entity list page (e.g. /items) */
export function generateEntityListMetadata(
  label: string,
  description: string,
  href: string,
): Metadata {
  return {
    title: label,
    description,
    alternates: { canonical: href },
    openGraph: { title: label, description, url: href, type: 'website' },
  };
}

/** Metadata for an entity detail page (e.g. /items/sprinkler) */
export function generateEntityMetadata(
  name: string,
  description: string,
  href: string,
  image?: string,
): Metadata {
  return {
    title: name,
    description,
    alternates: { canonical: href },
    openGraph: {
      title: name,
      description,
      url: href,
      type: 'article',
      ...(image && { images: [{ url: image }] }),
    },
  };
}

/** Metadata for an article/guide page */
export function generateArticleMetadata(
  title: string,
  description: string,
  href: string,
  options?: { image?: string; date?: string },
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: href },
    openGraph: {
      title,
      description,
      url: href,
      type: 'article',
      ...(options?.date && { publishedTime: options.date }),
      ...(options?.image && { images: [{ url: options.image }] }),
    },
  };
}

/** JSON-LD structured data for a game entity (Thing) */
export function buildEntityJsonLd(params: {
  name: string;
  description: string;
  slug: string;
  entityType: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: params.name,
    description: params.description,
    url: `${siteConfig.url}/${params.entityType}/${params.slug}`,
    ...(params.image && { image: `${siteConfig.url}${params.image}` }),
  };
}

/** JSON-LD structured data for an Article */
export function buildArticleJsonLd(params: {
  title: string;
  description: string;
  slug: string;
  category: string;
  date?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: `${siteConfig.url}/${params.category}/${params.slug}`,
    ...(params.date && { datePublished: params.date }),
    ...(params.author && { author: { '@type': 'Person', name: params.author } }),
    ...(params.image && { image: `${siteConfig.url}${params.image}` }),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
