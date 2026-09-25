import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { ArticleMeta } from '@/lib/schema';

interface ArticleTemplateProps {
  meta: ArticleMeta;
  content: ReactNode;
  breadcrumbLabel?: string;
  section?: {
    label: string;
    href: string;
  };
}

/**
 * Shared article layout for guides, updates, codes, and other MDX-based content.
 */
export function ArticleTemplate({ meta, content, breadcrumbLabel, section }: ArticleTemplateProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb
          items={breadcrumbLabel
          ? [
              { label: 'Home', href: '/' },
              { label: breadcrumbLabel },
            ]
          : section
          ? [
              { label: 'Home', href: '/' },
              { label: section.label, href: section.href },
              { label: meta.title },
            ]
          : [
              { label: 'Home', href: '/' },
              { label: meta.title },
            ]}
      />

      {meta.image && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted mb-6">
          <Image src={meta.image} alt={meta.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>
      )}

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-pre:border prose-pre:border-border prose-pre:bg-card prose-pre:text-foreground prose-th:text-foreground">
        {content}
      </article>
    </div>
  );
}
