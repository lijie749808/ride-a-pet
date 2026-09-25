import type { ContentStatus } from './publication';

export type ColorPair = {
  background: string;
  foreground: string;
};

export type QuickFact = {
  label: string;
  field: string;
  suffix?: string;
};

export type CardFieldMapping = {
  titleField?: string;
  descriptionField?: string;
  imageField?: string;
  badgeField?: string;
  metaField?: string;
};

export type DetailSection =
  | { type: 'table'; title: string; field: string }
  | { type: 'list'; title: string; field: string }
  | { type: 'methods'; title: string; field: string }
  | { type: 'markdown'; title: string; field: string }
  | { type: 'related'; title: string; field: string; database?: string };

export interface DatabaseDefinition {
  label: string;
  description: string;
  status?: ContentStatus;
  card?: CardFieldMapping;
  category?: {
    field: string;
    label: string;
    colors?: Record<string, ColorPair>;
  };
  detail: {
    quickFacts: QuickFact[];
    sections: DetailSection[];
  };
}

/**
 * Add a database here to give it a list page and detail pages automatically.
 * Its key is used as both the URL segment and the content/entities directory.
 */
export const databases = {
  eggs: {
    label: 'Eggs',
    description: 'Explore Ride a Pet eggs, hatchable pets, and how to obtain each egg.',
    card: { badgeField: 'rarity' },
    detail: {
      quickFacts: [{ label: 'Rarity', field: 'rarity' }, { label: 'Price', field: 'price' }],
      sections: [{ type: 'table', title: 'Hatch Chances', field: 'hatchChances' }, { type: 'methods', title: 'How to Obtain', field: 'obtainMethods' }],
    },
  },
  rebirths: {
    label: 'Rebirths',
    description: 'Plan your Ride a Pet rebirths with requirements and rewards.',
    detail: {
      quickFacts: [{ label: 'Rebirth Level', field: 'level' }],
      sections: [{ type: 'table', title: 'Requirements', field: 'requirements' }, { type: 'table', title: 'Rewards', field: 'rewards' }],
    },
  },
  mutations: {
    label: 'Mutations',
    description: 'Discover Ride a Pet mutations, special variations, and their effects.',
    card: { badgeField: 'rarity' },
    detail: {
      quickFacts: [{ label: 'Rarity', field: 'rarity' }],
      sections: [{ type: 'table', title: 'Effects', field: 'effects' }, { type: 'methods', title: 'How to Obtain', field: 'obtainMethods' }],
    },
  },
  gears: {
    label: 'Gears',
    description: 'Browse Ride a Pet gears, equipment stats, and how to obtain them.',
    card: { badgeField: 'rarity', metaField: 'type' },
    category: { field: 'type', label: 'Type' },
    detail: {
      quickFacts: [{ label: 'Type', field: 'type' }, { label: 'Rarity', field: 'rarity' }],
      sections: [{ type: 'table', title: 'Stats', field: 'stats' }, { type: 'methods', title: 'How to Obtain', field: 'obtainMethods' }],
    },
  },
  food: {
    label: 'Food',
    description: 'Explore Ride a Pet food, its effects, and where to find it.',
    card: { metaField: 'type' },
    category: { field: 'type', label: 'Type' },
    detail: {
      quickFacts: [{ label: 'Type', field: 'type' }, { label: 'Price', field: 'price' }],
      sections: [{ type: 'table', title: 'Effects', field: 'effects' }, { type: 'methods', title: 'How to Obtain', field: 'obtainMethods' }],
    },
  },
  items: {
    label: 'Items',
    description: 'Browse all items in the game.',
    status: 'draft',
    card: {
      titleField: 'name',
      descriptionField: 'description',
      imageField: 'image',
      badgeField: 'rarity',
      metaField: 'type',
    },
    category: {
      field: 'type',
      label: 'Type',
      colors: {
        Tool: { background: '#dbeafe', foreground: '#1d4ed8' },
        Weapon: { background: '#fee2e2', foreground: '#b91c1c' },
        Resource: { background: '#dcfce7', foreground: '#15803d' },
        Consumable: { background: '#fef3c7', foreground: '#b45309' },
      },
    },
    detail: {
      quickFacts: [
        { label: 'Type', field: 'type' },
        { label: 'Rarity', field: 'rarity' },
        { label: 'Sell Price', field: 'sellPrice', suffix: 'g' },
        { label: 'Buy Price', field: 'buyPrice', suffix: 'g' },
      ],
      sections: [
        { type: 'table', title: 'Stats', field: 'stats' },
        { type: 'methods', title: 'How to Obtain', field: 'obtainMethods' },
        { type: 'related', title: 'Related Items', field: 'relatedItems' },
      ],
    },
  },
  pets: {
    label: 'Pets',
    description: 'Browse all pets in the game.',
    status: 'draft',
    card: {
      titleField: 'name',
      descriptionField: 'description',
      imageField: 'image',
      badgeField: 'rarity',
      metaField: 'species',
    },
    category: { field: 'species', label: 'Species' },
    detail: {
      quickFacts: [
        { label: 'Species', field: 'species' },
        { label: 'Rarity', field: 'rarity' },
      ],
      sections: [
        { type: 'list', title: 'Abilities', field: 'abilities' },
        { type: 'table', title: 'Stats', field: 'stats' },
        { type: 'methods', title: 'How to Obtain', field: 'obtainMethods' },
        { type: 'related', title: 'Related Pets', field: 'relatedPets' },
      ],
    },
  },
  weapons: {
    label: 'Weapons',
    description: 'Browse all weapons in the game.',
    card: {
      titleField: 'name',
      descriptionField: 'description',
      imageField: 'image',
      badgeField: 'rarity',
      metaField: 'type',
    },
    category: { field: 'type', label: 'Type' },
    detail: { quickFacts: [{ label: 'Type', field: 'type' }, { label: 'Rarity', field: 'rarity' }], sections: [{ type: 'table', title: 'Stats', field: 'stats' }] },
  },
  locations: {
    label: 'Locations',
    description: 'Browse all locations in the game.',
    card: {
      titleField: 'name',
      descriptionField: 'description',
      imageField: 'image',
      metaField: 'region',
    },
    category: { field: 'region', label: 'Region' },
    detail: { quickFacts: [{ label: 'Region', field: 'region' }], sections: [{ type: 'table', title: 'Details', field: 'details' }] },
  },
  npcs: {
    label: 'NPCs',
    description: 'Browse all NPCs in the game.',
    card: {
      titleField: 'name',
      descriptionField: 'description',
      imageField: 'image',
      metaField: 'role',
    },
    category: { field: 'role', label: 'Role' },
    detail: { quickFacts: [{ label: 'Role', field: 'role' }, { label: 'Location', field: 'location' }], sections: [{ type: 'list', title: 'Services', field: 'services' }] },
  },
  quests: {
    label: 'Quests',
    description: 'Browse all quests in the game.',
    card: {
      titleField: 'name',
      descriptionField: 'description',
      imageField: 'image',
      metaField: 'category',
    },
    category: { field: 'category', label: 'Category' },
    detail: { quickFacts: [{ label: 'Category', field: 'category' }, { label: 'Level', field: 'level' }], sections: [{ type: 'table', title: 'Rewards', field: 'rewards' }] },
  },
} satisfies Record<string, DatabaseDefinition>;

export type DatabaseSlug = keyof typeof databases;

export function getDatabaseDefinition(slug: string): DatabaseDefinition | undefined {
  return databases[slug as DatabaseSlug];
}

export function getDatabaseSlugs({ includeHidden = false } = {}): DatabaseSlug[] {
  const slugs = Object.keys(databases) as DatabaseSlug[];
  return includeHidden
    ? slugs
    : slugs.filter((slug) => getDatabaseDefinition(slug)?.status !== 'hidden');
}

export function getEntityField(entity: Record<string, unknown>, field: string): unknown {
  return field.split('.').reduce<unknown>((value, key) => (
    value && typeof value === 'object' ? (value as Record<string, unknown>)[key] : undefined
  ), entity);
}

export function formatEntityValue(value: unknown, suffix = ''): string | null {
  if (value === undefined || value === null || value === '') return null;
  const text = Array.isArray(value) ? value.join(', ') : value === true ? 'Yes' : value === false ? 'No' : String(value);
  return `${text}${suffix}`;
}
