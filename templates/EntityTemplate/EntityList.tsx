'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { EntityCard } from '@/components/EntityCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getEntityField,
  formatEntityValue,
  type CardFieldMapping,
  type ColorPair,
} from '@/lib/database-config';

interface Entity {
  id: string;
  tags?: string[];
  status?: 'published' | 'draft';
  [key: string]: unknown;
}

interface EntityListProps {
  title: string;
  description?: string;
  database: string;
  entities: Entity[];
  breadcrumbs: { label: string; href?: string }[];
  card?: CardFieldMapping;
  categoryField?: string;
  categoryLabel?: string;
  categoryColors?: Record<string, ColorPair>;
}

export function EntityList({
  title,
  description,
  database,
  entities,
  breadcrumbs,
  card = {},
  categoryField,
  categoryLabel = 'Category',
  categoryColors = {},
}: EntityListProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const {
    titleField = 'name',
    descriptionField = 'description',
    imageField = 'image',
    badgeField,
    metaField,
  } = card;
  const categories = categoryField
    ? [...new Set(entities.map((entity) => formatEntityValue(getEntityField(entity, categoryField))).filter(Boolean))] as string[]
    : [];
  const visibleEntities = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return entities.filter((entity) => {
      const category = categoryField ? formatEntityValue(getEntityField(entity, categoryField)) : null;
      const title = formatEntityValue(getEntityField(entity, titleField));
      const description = formatEntityValue(getEntityField(entity, descriptionField));
      const badge = badgeField ? formatEntityValue(getEntityField(entity, badgeField)) : null;
      const meta = metaField ? formatEntityValue(getEntityField(entity, metaField)) : null;
      const matchesCategory = activeCategory === 'All' || category === activeCategory;
      const matchesQuery = !normalizedQuery || [title, description, category, badge, meta, ...(entity.tags ?? [])]
        .filter(Boolean)
        .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [
    activeCategory,
    badgeField,
    categoryField,
    descriptionField,
    entities,
    metaField,
    query,
    titleField,
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbs} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description && <p className="mt-2 text-muted-foreground text-lg">{description}</p>}
        <p className="mt-1 text-sm text-muted-foreground">{visibleEntities.length} of {entities.length} entries</p>
      </header>

      {entities.length > 0 && (
        <div className="mb-6 space-y-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${title.toLocaleLowerCase()}…`}
              className="h-10 pl-9 pr-9"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 size-10"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2" aria-label={`Filter by ${categoryLabel}`}>
              {['All', ...categories].map((category) => {
                const color = categoryColors[category];
                const isActive = activeCategory === category;

                return (
                  <Button
                    key={category}
                    type="button"
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    style={color ? {
                      backgroundColor: isActive ? color.foreground : color.background,
                      borderColor: color.foreground,
                      color: isActive ? color.background : color.foreground,
                    } : undefined}
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {visibleEntities.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleEntities.map((entity) => (
            <EntityCard
              key={entity.id}
              title={formatEntityValue(getEntityField(entity, titleField)) ?? entity.id}
              description={formatEntityValue(getEntityField(entity, descriptionField)) ?? undefined}
              image={formatEntityValue(getEntityField(entity, imageField)) ?? undefined}
              badge={badgeField ? formatEntityValue(getEntityField(entity, badgeField)) ?? undefined : undefined}
              meta={metaField ? formatEntityValue(getEntityField(entity, metaField)) ?? undefined : undefined}
              metaColor={metaField ? categoryColors[formatEntityValue(getEntityField(entity, metaField)) ?? ''] : undefined}
              href={`/${database}/${entity.id}`}
              underConstruction={entity.status === 'draft'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No matching entries found.</p>
          {(query || activeCategory !== 'All') && (
            <Button
              type="button"
              variant="link"
              className="mt-2"
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
