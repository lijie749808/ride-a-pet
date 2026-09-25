import type { ContentStatus } from './publication';

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
export type EntityType = import('./database-config').DatabaseSlug;
export type ArticleCategory = 'guides' | 'updates' | 'codes' | 'events' | 'faqs';

export interface ObtainMethod {
  method: string;
  details: string;
}

export interface EntityBase {
  id: string;
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  status?: ContentStatus;
}

export interface Item extends EntityBase {
  type: string;
  rarity: Rarity;
  sellPrice?: number;
  buyPrice?: number;
  stats?: Record<string, string | number>;
  obtainMethods?: ObtainMethod[];
  relatedItems?: string[];
}

export interface Pet extends EntityBase {
  species: string;
  rarity: Rarity;
  abilities?: string[];
  stats?: Record<string, string | number>;
  obtainMethods?: ObtainMethod[];
  relatedPets?: string[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  image?: string;
  status: ContentStatus;
}
