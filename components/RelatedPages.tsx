import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface RelatedPage {
  id: string;
  name: string;
  image?: string;
  href: string;
}

interface RelatedPagesProps {
  title?: string;
  pages: RelatedPage[];
}

export function RelatedPages({ title = 'Related Items', pages }: RelatedPagesProps) {
  if (pages.length === 0) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {pages.map((page) => (
          <Button key={page.id} asChild variant="outline" className="h-auto py-2">
            <Link href={page.href}>
              {page.image && (
                <div className="relative w-6 h-6 shrink-0">
                  <Image src={page.image} alt={page.name} fill sizes="24px" className="object-contain" />
                </div>
              )}
              {page.name}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
