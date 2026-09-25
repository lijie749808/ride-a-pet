import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Breadcrumb } from '@/components/Breadcrumb';
import { EntityInfoGrid } from '@/components/EntityInfo';
import { EntityTable } from '@/components/EntityTable';
import { RelatedPages } from '@/components/RelatedPages';
import { Badge } from '@/components/ui/badge';
import {
  formatEntityValue,
  getEntityField,
  type DatabaseDefinition,
  type DetailSection,
} from '@/lib/database-config';
import type { DatabaseEntity } from '@/lib/entity';

interface RelatedPage {
  id: string;
  name: string;
  image?: string;
  href: string;
}

interface EntityDetailProps {
  entity: DatabaseEntity;
  database: DatabaseDefinition;
  relatedPages?: RelatedPage[];
  breadcrumbs: { label: string; href?: string }[];
}

type ObtainMethod = { method: string; details: string };

function isRecord(value: unknown): value is Record<string, string | number> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isObtainMethods(value: unknown): value is ObtainMethod[] {
  return Array.isArray(value) && value.every((item) => (
    item && typeof item === 'object' && 'method' in item && 'details' in item
  ));
}

export function EntityDetail({
  entity,
  database,
  relatedPages,
  breadcrumbs,
}: EntityDetailProps) {
  const infoItems = database.detail.quickFacts.flatMap((fact) => {
    const value = formatEntityValue(getEntityField(entity, fact.field), fact.suffix);
    return value === null ? [] : [{ label: fact.label, value }];
  });

  const renderSection = (section: DetailSection) => {
    const value = getEntityField(entity, section.field);
    if (section.type === 'table' && isRecord(value) && Object.keys(value).length > 0) {
      return <EntityTable key={section.field} stats={value} title={section.title} />;
    }

    if (section.type === 'list' && Array.isArray(value) && value.length > 0) {
      return (
        <div key={section.field} className="rounded-xl border overflow-hidden">
          <div className="bg-muted px-4 py-2.5 border-b">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">{section.title}</h2>
          </div>
          <ul className="divide-y">
            {value.map((item, index) => <li key={index} className="px-4 py-3 text-sm text-foreground">{formatEntityValue(item)}</li>)}
          </ul>
        </div>
      );
    }

    if (section.type === 'methods' && isObtainMethods(value) && value.length > 0) {
      return (
        <div key={section.field}>
          <h2 className="text-lg font-semibold text-foreground mb-3">{section.title}</h2>
          <div className="space-y-2">
            {value.map((method, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted border border-border">
                <span className="font-medium text-sm text-foreground w-28 shrink-0">{method.method}</span>
                <span className="text-sm text-muted-foreground">{method.details}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (section.type === 'markdown' && typeof value === 'string' && value.trim()) {
      return (
        <div key={section.field}>
          <h2 className="text-lg font-semibold text-foreground mb-3">{section.title}</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline">
            <MDXRemote
              source={value}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </div>
      );
    }

    if (section.type === 'related' && relatedPages && relatedPages.length > 0) {
      return <RelatedPages key={section.field} title={section.title} pages={relatedPages} />;
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        {entity.image ? (
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-xl bg-muted border border-border">
            <Image src={entity.image} alt={entity.name} fill sizes="(max-width: 640px) 128px, 160px" className="object-contain p-3" />
          </div>
        ) : (
          <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-xl bg-muted border border-border flex items-center justify-center">
            <ImageOff className="size-12 text-muted-foreground" strokeWidth={1.5} />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{entity.name}</h1>
          <p className="mt-2 text-muted-foreground">{entity.description}</p>
          {entity.tags && entity.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {entity.tags.map((tag) => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick info */}
      {infoItems.length > 0 && <EntityInfoGrid items={infoItems} />}

      {database.detail.sections.map((section) => {
        const content = renderSection(section);
        return content && <section key={`${section.type}-${section.field}`} className="mt-6">{content}</section>;
      })}
    </div>
  );
}
