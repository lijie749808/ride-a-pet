/**
 * Site-wide configuration — single source of truth.
 * Change these values to rebrand the wiki for any game without touching component code.
 *
 * Before deploying, set the NEXT_PUBLIC_SITE_URL environment variable to your production domain.
 */

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: 'GameWiki',
  logo: '/logo.png',
  tagline: 'The most comprehensive community-driven encyclopedia for the game.',
  description:
    'The most comprehensive community-driven encyclopedia for the game. Browse items, weapons, pets, guides and more.',

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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',

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

  // ── Navigation (drives Navbar dropdown menus) ─────────────────────────────
  nav: [
    {
      id: 'database',
      label: 'Database',
      items: [
        { label: 'Items',     href: '/items', },
        { label: 'Weapons',   href: '/weapons', },
        { label: 'Pets',      href: '/pets', },
        { label: 'Locations', href: '/locations', },
        { label: 'NPCs',      href: '/npcs', },
        { label: 'Quests',    href: '/quests', },
      ],
    },
    {
      id: 'articles',
      label: 'Articles',
      items: [
        { label: 'Guides',  href: '/guides', },
        { label: 'Updates', href: '/updates', },
        { label: 'Codes',   href: '/codes', },
        { label: 'Events',  href: '/events', },
        { label: 'FAQs',    href: '/faqs', },
      ],
    }
  ],

  // ── Homepage: Database category cards ─────────────────────────────────────
  dbCategories: [
    { label: 'Items',     href: '/items', },
    { label: 'Weapons',   href: '/weapons', },
    { label: 'Pets',      href: '/pets', },
    { label: 'Locations', href: '/locations', },
    { label: 'NPCs',      href: '/npcs', },
    { label: 'Quests',    href: '/quests', },
  ],

  // ── Homepage: content blocks ──────────────────────────────────────────────
  homepage: {
    database: {
      title: 'Explore Database',
      subtitle: 'Everything you need to know, all in one place.',
      emptyCountLabel: 'Browse database',
      countSuffix: 'entries',
    },
    overview: {
      title: 'Game Overview',
      subtitle: 'A quick look at what awaits you.',
      cards: [
        { title: 'Explore a Living World', description: 'Travel through varied locations, uncover secrets, and meet memorable characters.' },
        { title: 'Collect & Upgrade', description: 'Find powerful gear, rare collectibles, and companions to build your ideal loadout.' },
        {
          title: 'Take on New Challenges',
          emptyDescription: 'Complete quests, defeat tough enemies, and master each update as it arrives.',
          recentItemsDescription: 'Browse {count} recently added item{plural}, then complete quests and master every update.',
        },
      ],
    },
    updates: {
      title: 'Latest Updates',
      href: '/updates',
      linkLabel: 'View all updates',
      entries: [
        { version: 'v1.5', title: 'Summer Expansion', description: 'New areas, quests, and limited-time rewards to discover.' },
        { version: 'v1.4', title: 'Companions Update', description: 'Meet new pets and unlock fresh ways to customize your journey.' },
        { version: 'v1.3', title: 'Combat Rebalance', description: 'A round of ability improvements, weapon tuning, and quality-of-life fixes.' },
      ],
    },
    guides: {
      title: 'Popular Guides',
      href: '/guides',
      linkLabel: 'Browse all guides',
      fallback: [
        { slug: 'getting-started', title: 'Beginner Guide', description: 'Learn the essentials and get started quickly.', date: '' },
        { slug: 'farming-tips', title: 'Best Farming Routes', description: 'Earn resources efficiently with these reliable routes.', date: '' },
        { slug: 'combat-basics', title: 'Combat Basics', description: 'Build a stronger loadout and win more encounters.', date: '' },
      ],
    },
    tools: {
      title: 'Tools',
      subtitle: 'Plan your next adventure.',
      entries: [
        { title: 'Calculator', href: '/calculator', description: 'Compare costs, stats, and upgrade requirements.' },
        { title: 'Tracker', href: '/tracker', description: 'Keep track of your collection, quests, and goals.' },
      ],
    },
    faq: {
      title: 'FAQ',
      href: '/faqs',
      linkLabel: 'View all FAQs',
      entries: [
        { question: 'How often is the wiki updated?', answer: 'We update pages whenever new game content is released or community information is verified.' },
        { question: 'Can I contribute information?', answer: 'Yes. Community contributions help keep the wiki accurate and complete.' },
        { question: 'Where can I find redeemable codes?', answer: 'Check the Codes section for currently active rewards and redemption instructions.' },
      ],
    },
  },

  footer: {
    description: 'Community Encyclopedia',
    links: [
      { label: 'Guides', href: '/guides' },
      { label: 'Items', href: '/items' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
} as const;
