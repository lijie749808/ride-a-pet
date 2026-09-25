import Link from 'next/link';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EntityCardProps {
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  meta?: string;
  metaColor?: { background: string; foreground: string };
  href: string;
  underConstruction?: boolean;
}

const rarityColors: Record<string, string> = {
  Common: 'bg-gray-100 text-gray-700',
  Uncommon: 'bg-green-100 text-green-700',
  Rare: 'bg-blue-100 text-blue-700',
  Epic: 'bg-purple-100 text-purple-700',
  Legendary: 'bg-yellow-100 text-yellow-700',
};

export function EntityCard({ title, description, image, badge, meta, metaColor, href, underConstruction }: EntityCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full gap-0 overflow-hidden p-0 transition-all hover:border-ring hover:shadow-md hover:-translate-y-0.5">
        {image ? (
          <div className="relative w-full aspect-square bg-muted">
            <Image src={image} alt={title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-contain p-4" />
          </div>
        ) : (
          <div className="w-full aspect-square bg-muted flex items-center justify-center">
            <ImageOff className="size-8 text-muted-foreground" strokeWidth={1.5} />
          </div>
        )}
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="font-semibold group-hover:text-primary transition-colors leading-tight">
              {title}
            </h3>
            {badge && (
              <Badge className={rarityColors[badge] ?? 'bg-gray-100 text-gray-600'}>
                {badge}
              </Badge>
            )}
            {underConstruction && <Badge variant="secondary">Under construction</Badge>}
          </div>
          {meta && (
            <span
              className="w-fit rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              style={metaColor ? { backgroundColor: metaColor.background, color: metaColor.foreground } : undefined}
            >
              {meta}
            </span>
          )}
          {description && <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>}
        </CardContent>
      </Card>
    </Link>
  );
}
