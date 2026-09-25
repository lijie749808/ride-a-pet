import fs from 'fs';
import path from 'path';
import type { ContentStatus } from './publication';
import { parseContentStatus } from './publication';
const ENTITIES_DIR = path.join(process.cwd(), 'content', 'entities');

function isNonEmptyJsonFile(dir: string, file: string): boolean {
  return file.endsWith('.json') && fs.statSync(path.join(dir, file)).size > 0;
}

export interface DatabaseEntity {
  id: string;
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  status: ContentStatus;
  [key: string]: unknown;
}

export function getAllEntities<T = DatabaseEntity>(database: string): T[] {
  const dir = path.join(ENTITIES_DIR, database);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => isNonEmptyJsonFile(dir, file))
    .map((file) => parseEntity<T>(path.join(dir, file)))
    .filter((entity) => (entity as { status: ContentStatus }).status !== 'hidden')
    .sort((a, b) => {
      const aId = String((a as { id?: string }).id ?? '');
      const bId = String((b as { id?: string }).id ?? '');
      return aId.localeCompare(bId, undefined, { numeric: true });
    });
}

export function getEntityBySlug<T = DatabaseEntity>(database: string, slug: string): T | null {
  const filePath = path.join(ENTITIES_DIR, database, `${slug}.json`);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) return null;
  return parseEntity<T>(filePath);
}

export function getEntitySlugs(database: string): string[] {
  const dir = path.join(ENTITIES_DIR, database);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => isNonEmptyJsonFile(dir, file))
    .map((f) => f.replace('.json', ''))
    .filter((slug) => getEntityBySlug<DatabaseEntity>(database, slug)?.status !== 'hidden');
}

function parseEntity<T>(filePath: string): T {
  const entity = JSON.parse(fs.readFileSync(filePath, 'utf8')) as T & { status?: unknown };
  entity.status = parseContentStatus(entity.status);
  return entity;
}
