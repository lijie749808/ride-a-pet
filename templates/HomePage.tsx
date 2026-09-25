import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, BookOpen, Egg, MapPin, Newspaper,
  PawPrint, RotateCcw, Settings2, Sparkles, Utensils, CalendarDays,
  type LucideIcon,
} from 'lucide-react';
import type { ArticleMeta } from '@/lib/schema';
import { siteConfig } from '@/lib/config';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DB_ICONS: Record<string, LucideIcon> = {
  Pets: PawPrint, Eggs: Egg, Rebirths: RotateCcw, Locations: MapPin,
  Mutations: Sparkles, Gears: Settings2, Food: Utensils,
};

interface HomePageProps {
  latestGuides: ArticleMeta[];
  latestUpdates: ArticleMeta[];
  latestEvents: ArticleMeta[];
  counts: Record<string, number>;
}

export function HomePage({ latestGuides, latestUpdates, latestEvents, counts }: HomePageProps) {
  const { homepage } = siteConfig;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
      <section className="flex items-center justify-between gap-6 border-b py-10 sm:py-14" aria-labelledby="welcome-title">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />The community field guide
          </p>
          <h1 id="welcome-title" className="text-4xl font-bold tracking-tight sm:text-5xl">{siteConfig.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{siteConfig.description}</p>
          <Link href="#database" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Explore the wiki<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="hidden shrink-0 rounded-3xl border bg-card p-5 sm:block">
          <Image src={siteConfig.logo} alt="" width={112} height={112} className="size-28 object-contain" />
        </div>
      </section>

      <section id="database" aria-labelledby="database-title" className="py-9 sm:py-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="database-title" className="text-xl font-semibold tracking-tight">{homepage.database.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{homepage.database.subtitle}</p>
          </div>
          <span className="shrink-0 pt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{String(siteConfig.dbCategories.length).padStart(2, '0')} categories</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {siteConfig.dbCategories.map((category) => {
            const Icon = DB_ICONS[category.label];
            const count = counts[category.href.slice(1)] ?? 0;
            return (
              <Link key={category.href} href={category.href} className="group rounded-xl">
                <Card className="h-full gap-0 border-border bg-card p-4 shadow-none transition-colors group-hover:border-primary/50 group-hover:bg-accent/50">
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="size-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
                    <ArrowUpRight className="size-3.5 text-muted-foreground/50 transition-colors group-hover:text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold">{category.label}</h3>
                  <p className="mt-2 min-h-10 text-xs leading-5 text-muted-foreground">{category.description}</p>
                  <p className="mt-4 border-t pt-3 text-[10px] text-muted-foreground">
                    {count > 0 ? `${count} ${count === 1 ? 'entry' : homepage.database.countSuffix}` : homepage.database.emptyCountLabel}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-7 border-t py-9 md:grid-cols-2 sm:py-10">
        <ArticleSection id="updates" config={homepage.updates} articles={latestUpdates} icon={Newspaper} />
        <ArticleSection id="events" config={homepage.events} articles={latestEvents} icon={CalendarDays} />
      </div>
      <div className="border-t pt-9 sm:pt-10">
        <ArticleSection id="guides" config={homepage.guides} articles={latestGuides} icon={BookOpen} columns />
      </div>
    </div>
  );
}

function ArticleSection({ id, config, articles, icon: Icon, columns = false }: {
  id: string;
  config: { title: string; subtitle: string; href: string; linkLabel: string; emptyTitle: string; emptyDescription: string };
  articles: ArticleMeta[];
  icon: LucideIcon;
  columns?: boolean;
}) {
  return (
    <section aria-labelledby={`${id}-title`}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id={`${id}-title`} className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <Icon className="size-4 text-muted-foreground" aria-hidden="true" />{config.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{config.subtitle}</p>
        </div>
        <Link href={config.href} className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
          {config.linkLabel}<ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      {articles.length > 0 ? (
        <div className={columns ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-3'}>
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`${config.href}/${article.slug}`} className="group rounded-xl">
              <Card className="h-full gap-0 p-5 shadow-none transition-colors group-hover:border-primary/40">
                <div className="mb-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="rounded-md text-[10px] font-normal">{article.tags?.[0] ?? config.title}</Badge>
                  {article.date && <time dateTime={article.date}>{article.date}</time>}
                </div>
                <h3 className="flex items-start justify-between gap-3 text-sm font-semibold leading-6 group-hover:text-primary">
                  {article.title}<ArrowUpRight className="mt-1 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{article.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex min-h-40 items-center gap-4 rounded-xl border border-dashed bg-card/40 p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-card"><Icon className="size-5 text-muted-foreground" aria-hidden="true" /></span>
          <div>
            <h3 className="text-sm font-medium">{config.emptyTitle}</h3>
            <p className="mt-1.5 max-w-sm text-sm leading-6 text-muted-foreground">{config.emptyDescription}</p>
          </div>
        </div>
      )}
    </section>
  );
}
