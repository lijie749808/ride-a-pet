import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ArticleCategory, ArticleMeta } from './schema';
import { parseContentStatus } from './publication';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

function isArticleFile(file: string): boolean {
  return /\.mdx?$/.test(file) && !/^index\.mdx?$/i.test(file);
}

function parseMeta(slug: string, data: Record<string, unknown>): ArticleMeta {
  const rawDate = data.date;
  const date =
    rawDate instanceof Date
      ? rawDate.toISOString().split('T')[0]
      : rawDate
      ? String(rawDate)
      : '';
  return {
    slug,
    title: data.title ? String(data.title) : slug,
    description: data.description ? String(data.description) : '',
    date,
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    image: data.image ? String(data.image) : undefined,
    status: parseContentStatus(data.status),
  };
}

export function getAllArticles(category: ArticleCategory): ArticleMeta[] {
  const dir = path.join(ARTICLES_DIR, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(isArticleFile)
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return parseMeta(slug, data);
    })
    .filter((article) => article.status === 'published')
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getArticleBySlug(
  category: ArticleCategory,
  slug: string,
): { meta: ArticleMeta; content: string } | null {
  for (const ext of ['.mdx', '.md']) {
    const filePath = path.join(ARTICLES_DIR, category, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    return { meta: parseMeta(slug, data), content };
  }
  return null;
}

export function getArticleSlugs(category: ArticleCategory): string[] {
  const dir = path.join(ARTICLES_DIR, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(isArticleFile)
    .map((f) => f.replace(/\.mdx?$/, ''))
    .filter((slug) => getArticleBySlug(category, slug)?.meta.status !== 'hidden');
}
