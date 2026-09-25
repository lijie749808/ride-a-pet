import Link from 'next/link';
import { Construction } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UnderConstructionProps {
  title: string;
  section?: { label: string; href: string };
}

export function UnderConstruction({ title, section }: UnderConstructionProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumb
        items={section
          ? [{ label: 'Home', href: '/' }, { label: section.label, href: section.href }, { label: title }]
          : [{ label: 'Home', href: '/' }, { label: title }]}
      />
      <Card className="mt-10 border-dashed py-12 text-center">
        <CardContent className="flex flex-col items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-muted">
            <Construction className="size-7 text-muted-foreground" aria-hidden="true" />
          </span>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">This page is under construction.</p>
          </div>
          <Button asChild variant="outline">
            <Link href={section?.href ?? '/'}>Back to {section?.label ?? 'Home'}</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
