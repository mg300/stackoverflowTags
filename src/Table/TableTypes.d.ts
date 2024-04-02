interface Data {
  name: string;
  count: number;
}
interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}
type Order = "asc" | "desc";
interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}
