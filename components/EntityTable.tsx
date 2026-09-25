import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';

interface EntityTableProps {
  stats: Record<string, string | number>;
  title?: string;
}

export function EntityTable({ stats, title = 'Stats' }: EntityTableProps) {
  const entries = Object.entries(stats);
  if (entries.length === 0) return null;
  return (
    <div className="rounded-xl border overflow-hidden">
      {title && (
        <div className="bg-muted px-4 py-2.5 border-b">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">{title}</h3>
        </div>
      )}
      <Table>
        <TableBody>
          {entries.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="px-4 py-2.5 font-medium text-muted-foreground w-2/5">{key}</TableCell>
              <TableCell className="px-4 py-2.5 text-foreground whitespace-normal">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
