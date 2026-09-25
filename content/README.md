# Content publication status

Article frontmatter and entity JSON files support an optional `status` field:

- `published` (default): render the full page and include it in lists and `sitemap.xml`.
- `draft`: generate a public “This page is under construction” page with `noindex`; entity cards remain visible with an “Under construction” badge.
- `hidden`: do not generate the detail page and exclude it from lists and `sitemap.xml`.

For an article:

```md
---
title: Advanced Farming
status: draft
---
```

For a database entity:

```json
{
  "id": "advanced-sprinkler",
  "name": "Advanced Sprinkler",
  "description": "Details coming soon.",
  "status": "draft"
}
```

Invalid status values fail the build so publication typos cannot silently expose content.

## Database section status

An entire database section can use the same status in `lib/database-config.ts`:

```ts
items: {
  label: 'Items',
  description: 'Browse all items in the game.',
  status: 'draft',
  // ...
}
```

A draft or hidden database status applies to both the section page and all of its detail pages.
