'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  Backpack,
  Swords,
  PawPrint,
  Map as MapIcon,
  Users,
  ScrollText,
  BookOpen,
  Newspaper,
  Gift,
  PartyPopper,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const NAV_ICONS: Record<string, LucideIcon> = {
  Items: Backpack,
  Weapons: Swords,
  Pets: PawPrint,
  Locations: MapIcon,
  NPCs: Users,
  Quests: ScrollText,
  Guides: BookOpen,
  Updates: Newspaper,
  Codes: Gift,
  Events: PartyPopper,
  FAQs: HelpCircle,
};

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="flex items-center gap-2 px-2 py-1.5 font-bold text-lg group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <Image
              src={siteConfig.logo}
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0 object-contain"
            />
            <span className="group-data-[collapsible=icon]:hidden">{siteConfig.name}</span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          {siteConfig.nav.map((group) => (
            <SidebarGroup key={group.id}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = NAV_ICONS[item.label] ?? BookOpen;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                          <Icon strokeWidth={1.75} />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <p className="px-2 py-1 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
            {siteConfig.name} — Community Wiki
          </p>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background px-4">
          <SidebarTrigger />
          <div className="relative ml-auto w-full max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input type="search" placeholder="Search wiki…" className="h-9 pl-9" />
          </div>
        </header>

        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
