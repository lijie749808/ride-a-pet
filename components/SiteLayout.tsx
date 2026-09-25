'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-4 pt-4 sm:flex-nowrap sm:px-6 sm:pt-0">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="flex shrink-0 items-center gap-2.5 font-bold tracking-tight">
            <Image src={siteConfig.logo} alt="" width={36} height={36} className="size-9 rounded-lg object-contain" />
            <span className="text-lg">{siteConfig.name}</span>
          </Link>
          <nav aria-label="Main navigation" className="-mb-px flex w-full gap-6 overflow-x-auto sm:w-auto sm:gap-7">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn('flex min-h-14 shrink-0 items-center border-b-2 text-sm font-medium transition-colors sm:min-h-18',
                  isActive(item.href) ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-border/60">
          <nav aria-label="Database navigation" className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
            <span className="mr-4 hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">Database</span>
            {siteConfig.dbCategories.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn('shrink-0 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground')}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</main>

      <footer className="mt-10 border-t">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
          <div>
            <Link href="/" className="text-sm font-semibold">{siteConfig.name}</Link>
            <p className="mt-1.5 text-xs text-muted-foreground">{siteConfig.footer.description}</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
            {siteConfig.footer.links.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                {link.label}<ArrowUpRight aria-hidden="true" className="size-3" />
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
