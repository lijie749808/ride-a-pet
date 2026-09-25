export type ContentStatus = 'published' | 'draft' | 'hidden';

export function parseContentStatus(value: unknown): ContentStatus {
  if (value === undefined || value === null || value === '') return 'published';
  if (value === 'published' || value === 'draft' || value === 'hidden') return value;

  throw new Error(`Invalid content status "${String(value)}". Expected published, draft, or hidden.`);
}

