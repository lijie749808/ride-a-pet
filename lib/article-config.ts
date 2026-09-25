import type { ArticleCategory } from './schema';

export interface ArticleSectionDefinition {
  label: string;
  description: string;
}

export const articleSections = {
  guides: {
    label: 'Guides',
    description: 'Tutorials and tips to help you master the game.',
  },
  updates: {
    label: 'Updates',
    description: 'Read the latest game updates, patch notes, and changes.',
  },
  codes: {
    label: 'Codes',
    description: 'Find active codes, rewards, and redemption instructions.',
  },
  events: {
    label: 'Events',
    description: 'Discover current and upcoming limited-time events.',
  },
  faqs: {
    label: 'FAQs',
    description: 'Answers to frequently asked questions about the game.',
  },
} satisfies Record<ArticleCategory, ArticleSectionDefinition>;

export type ArticleSectionSlug = keyof typeof articleSections;

export function getArticleSectionDefinition(
  slug: string,
): ArticleSectionDefinition | undefined {
  return articleSections[slug as ArticleSectionSlug];
}

export function getArticleSectionSlugs(): ArticleSectionSlug[] {
  return Object.keys(articleSections) as ArticleSectionSlug[];
}
