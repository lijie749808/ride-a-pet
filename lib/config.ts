/**
 * Site-wide configuration — single source of truth.
 * Change these values to rebrand the wiki for any game without touching component code.
 *
 * Before deploying, set the NEXT_PUBLIC_SITE_URL environment variable to your production domain.
 */

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'Ride a Pet Wiki',
  logo: '/logo.png',
  tagline: 'Find your next pet. Plan your next adventure.',
  description:
    'Explore Ride a Pet Wiki for pets, eggs, rebirths, locations, mutations, gears, and food. Find game updates, events, and guides for your next adventure.',

  // ── Homepage hero: game meta + call-to-action links (all editable) ─────────
  hero: {
    /** Shown as small tags under the tagline. Leave any value empty ('') to hide that tag. */
    developer: 'Awesome Studio',
    releaseDate: 'Jan 2021',
    genre: 'Adventure RPG',
    /** CTA buttons. Leave a url empty ('') to hide that button. */
    links: {
      roblox: 'https://www.roblox.com/games/000000000',
      discord: 'https://discord.gg/your-invite',
    },
    buttonLabels: {
      roblox: 'Play on Roblox',
      discord: 'Official Discord',
    },
  },

  /**
   * Production URL — used for canonical links, sitemap, og:url, JSON-LD.
   * Set NEXT_PUBLIC_SITE_URL=https://yourdomain.com in your .env.production
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rideapet.gamehubs.wiki/',

  // ── 统计与站长验证：填入对应 ID / 验证码，留空关闭；修改后重新构建部署 ──────
  analytics: {
    /**
     * Google Analytics 4 Measurement ID (for example: G-XXXXXXXXXX).
     * Paste the ID here to enable Google Analytics; leave it empty to disable tracking.
     */
    googleAnalyticsId: '',
    /** Microsoft Clarity 项目 ID（仅填写 ID，不要粘贴整段脚本）。 */
    clarityProjectId: '',
  },
  verification: {
    /** Bing Webmaster HTML meta 标签中 content 的值，不是完整标签。 */
    bing: '',
  },

  // Shared by the top navigation and homepage database cards.
  dbCategories: [
    { label: 'Pets', href: '/pets', description: 'Meet your next companion.' },
    { label: 'Eggs', href: '/eggs', description: 'Discover what you can hatch.' },
    { label: 'Rebirths', href: '/rebirths', description: 'Plan your next fresh start.' },
    { label: 'Locations', href: '/locations', description: 'Explore every destination.' },
    { label: 'Mutations', href: '/mutations', description: 'Discover special variations.' },
    { label: 'Gears', href: '/gears', description: 'Find the right equipment.' },
    { label: 'Food', href: '/food', description: 'Keep your pets adventure-ready.' },
  ],

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Events', href: '/events' },
    { label: 'Guides', href: '/guides' },
  ],

  homepage: {
    seo: {
      title: 'Ride a Pet Wiki | Pets, Eggs, Rebirths & Guides',
    },
    database: {
      title: 'Explore the database',
      subtitle: 'Everything you need, one category away.',
      emptyCountLabel: 'Explore database',
      countSuffix: 'entries',
    },
    updates: {
      title: 'Latest updates',
      subtitle: 'Keep up with what’s new.',
      href: '/updates',
      linkLabel: 'All updates',
      emptyTitle: 'More adventures ahead',
      emptyDescription: 'Check back for the latest updates and patch notes.',
    },
    events: {
      title: 'Events',
      subtitle: 'A little something extra to explore.',
      href: '/events',
      linkLabel: 'All events',
      emptyTitle: 'Watch this space',
      emptyDescription: 'Event news and limited-time activities will appear here.',
    },
    guides: {
      title: 'Guides & tips',
      subtitle: 'A helping hand for your next step.',
      href: '/guides',
      linkLabel: 'All guides',
      emptyTitle: 'Your adventure starts here',
      emptyDescription: 'New player guides and useful tips are on the way.',
    },
  },

  footer: {
    description: 'An independent community wiki.',
    links: [
      { label: 'Pets', href: '/pets' },
      { label: 'Guides', href: '/guides' },
      { label: 'Codes', href: '/codes' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
} as const;
