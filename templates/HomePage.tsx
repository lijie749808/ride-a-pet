import Link from 'next/link';
import {
  ChevronRight,
  Play,
  Calendar,
  Code2,
  Gamepad2,
  Backpack,
  Swords,
  PawPrint,
  Map as MapIcon,
  Users,
  ScrollText,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import type { Item, ArticleMeta } from '@/lib/schema';
import { siteConfig } from '@/lib/config';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

const DB_ICONS: Record<string, LucideIcon> = {
  Items: Backpack,
  Weapons: Swords,
  Pets: PawPrint,
  Locations: MapIcon,
  NPCs: Users,
  Quests: ScrollText,
};

interface HomePageProps {
  recentItems: Item[];
  latestGuides: ArticleMeta[];
  counts: Record<string, number>;
}

export function HomePage({ recentItems, latestGuides, counts }: HomePageProps) {
  const { homepage } = siteConfig;
  const featuredGuides = latestGuides.length > 0
    ? latestGuides.slice(0, 3)
    : homepage.guides.fallback;

  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b bg-linear-to-br from-indigo-50 via-background to-violet-100/50 dark:from-indigo-950/40 dark:via-background dark:to-violet-950/30">
        {/* soft glow for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-2xl rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10"
        />
        <div className="relative max-w-4xl mx-auto px-4 py-14 sm:py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              {siteConfig.name}
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            {siteConfig.tagline}
          </p>

          {/* Game meta tags */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {siteConfig.hero.developer && (
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm font-medium">
                <Code2 className="size-3.5" />
                {siteConfig.hero.developer}
              </Badge>
            )}
            {siteConfig.hero.releaseDate && (
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm font-medium">
                <Calendar className="size-3.5" />
                {siteConfig.hero.releaseDate}
              </Badge>
            )}
            {siteConfig.hero.genre && (
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm font-medium">
                <Gamepad2 className="size-3.5" />
                {siteConfig.hero.genre}
              </Badge>
            )}
          </div>

          {/* Call-to-action buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {siteConfig.hero.links.roblox && (
              <Button asChild size="lg">
                <a href={siteConfig.hero.links.roblox} target="_blank" rel="noopener noreferrer">
                  <Play className="size-4 fill-current" />
                  {siteConfig.hero.buttonLabels.roblox}
                </a>
              </Button>
            )}
            {siteConfig.hero.links.discord && (
              <Button asChild size="lg" variant="outline">
                <a href={siteConfig.hero.links.discord} target="_blank" rel="noopener noreferrer">
                  <DiscordIcon className="size-4" />
                  {siteConfig.hero.buttonLabels.discord}
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-14">
        {/* ── Explore database ── */}
        <section>
          <SectionHeader title={homepage.database.title} subtitle={homepage.database.subtitle} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {siteConfig.dbCategories.map((category) => {
              const Icon = DB_ICONS[category.label];
              const count = counts[category.label.toLowerCase()];

              return (
                <Link key={category.href} href={category.href} className="group">
                  <Card className="h-full p-4 text-center transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md">
                    <Icon className="size-6 mx-auto text-indigo-600 dark:text-indigo-400" strokeWidth={1.8} />
                    <p className="mt-2 font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{category.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {count === undefined ? homepage.database.emptyCountLabel : `${count} ${homepage.database.countSuffix}`}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Game overview ── */}
        <section>
          <SectionHeader title={homepage.overview.title} subtitle={homepage.overview.subtitle} />
          <div className="grid gap-4 md:grid-cols-3">
            {homepage.overview.cards.map((card) => {
              const description = 'recentItemsDescription' in card && recentItems.length > 0
                ? card.recentItemsDescription.replace('{count}', String(recentItems.length)).replace('{plural}', recentItems.length === 1 ? '' : 's')
                : ('description' in card ? card.description : card.emptyDescription);

              return (
                <Card key={card.title} className="p-5">
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Latest updates ── */}
        <section>
          <SectionHeader title={homepage.updates.title} href={homepage.updates.href} linkLabel={homepage.updates.linkLabel} />
          <div className="grid gap-3 md:grid-cols-3">
            {homepage.updates.entries.map((update) => (
              <Link key={update.version} href={homepage.updates.href} className="group">
                <Card className="h-full p-5 transition-all hover:border-indigo-400 hover:shadow-md">
                  <Badge variant="secondary">{update.version}</Badge>
                  <h3 className="mt-3 font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{update.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{update.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Popular guides ── */}
        <section>
          <SectionHeader title={homepage.guides.title} href={homepage.guides.href} linkLabel={homepage.guides.linkLabel} />
          <div className="grid gap-3 md:grid-cols-3">
            {featuredGuides.map((guide) => (
              <Link key={guide.slug} href={`${homepage.guides.href}/${guide.slug}`} className="group">
                <Card className="h-full p-5 transition-all hover:border-indigo-400 hover:shadow-md">
                  <BookOpen className="size-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="mt-3 font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Tools ── */}
        <section>
          <SectionHeader title={homepage.tools.title} subtitle={homepage.tools.subtitle} />
          <div className="grid gap-3 sm:grid-cols-2">
            {homepage.tools.entries.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="p-5 transition-all hover:border-indigo-400 hover:shadow-md">
                  <h3 className="font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{tool.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <SectionHeader title={homepage.faq.title} href={homepage.faq.href} linkLabel={homepage.faq.linkLabel} />
          <Card className="divide-y p-0">
            {homepage.faq.entries.map((faq) => (
              <details key={faq.question} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-4">
                  {faq.question}
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </Card>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t bg-card">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{siteConfig.logo} {siteConfig.name} — {siteConfig.footer.description}</p>
          <div className="flex items-center gap-5">
            {siteConfig.footer.links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-baseline justify-between mb-4">
      <div className="flex items-baseline gap-3">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {subtitle && <span className="text-sm text-muted-foreground hidden sm:inline">{subtitle}</span>}
      </div>
      {href && linkLabel && (
        <Button asChild variant="link" className="h-auto p-0 text-indigo-600 dark:text-indigo-400">
          <Link href={href}>
            {linkLabel}
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
