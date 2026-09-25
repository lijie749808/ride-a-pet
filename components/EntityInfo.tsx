import type { ReactNode } from 'react';

interface EntityInfoProps {
  label: string;
  value: string | number | ReactNode;
}

export function EntityInfo({ label, value }: EntityInfoProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</dt>
      <dd className="text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

interface EntityInfoGridProps {
  items: { label: string; value: string | number | ReactNode }[];
}

export function EntityInfoGrid({ items }: EntityInfoGridProps) {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-muted rounded-xl border border-border">
      {items.map((item) => (
        <EntityInfo key={item.label} label={item.label} value={item.value} />
      ))}
    </dl>
  );
}
